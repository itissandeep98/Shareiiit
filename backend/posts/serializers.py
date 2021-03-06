from tokenize import group
from django.contrib.auth import get_user_model
import json

from rest_framework.validators import UniqueTogetherValidator
from rest_framework import serializers

from .models import (
    Post,
    Book,
    Group,
    Category,
    Skill,
    SkillList,
    VoteCountLog,
    VoteLog,
    Notification,
)

from accounts.serializers import OSADetailsSerializer

from drf_extra_fields.relations import PresentablePrimaryKeyRelatedField


User = get_user_model()


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ("author",)


class GroupSerializer(serializers.ModelSerializer):
    # current_members = OSADetailsSerializer(read_only=True, many=True)
    # current_members_id = serializers.PrimaryKeyRelatedField(
    #     queryset=User.objects.all(), source="current_members", many=True
    # )

    current_members = PresentablePrimaryKeyRelatedField(
        queryset=User.objects.all(),
        presentation_serializer=OSADetailsSerializer,
        many=True,
    )

    class Meta:
        model = Group
        fields = (
            "members_needed",
            "current_members",
        )

    # def create(self, validated_data):
    #     current_members = validated_data.pop('current_members')
    #     question = Question.objects.create(**validated_data)

    #     for info in info_data:
    #         Choice.objects.create(question=question, **info)
    #     return question


class VoteCountLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteCountLog
        fields = ("upvote_count",)


class VoteLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteLog
        fields = ("upvoted_flag", "saved_flag", "dismiss_flag")
        read_only_fields = ("timestamp",)

    def update(self, instance, validated_data):
        count_log = VoteCountLog.objects.get_or_create(post=instance.post)[0]

        if (
            validated_data.get("upvoted_flag") == True
            and instance.upvoted_flag == False
        ):
            count_log.upvote_count += 1

        if (
            validated_data.get("upvoted_flag") == False
            and instance.upvoted_flag == True
        ):
            count_log.upvote_count -= 1

        count_log.save()

        return super(VoteLogSerializer, self).update(instance, validated_data)


class PostSerializer(serializers.ModelSerializer):
    """
    This is a serializer class for all categories of posts which is inherited by other serializer classes below.
    """

    created_by = serializers.SerializerMethodField()
    category = serializers.SlugRelatedField(read_only=True, slug_field="name")
    vote_log = serializers.SerializerMethodField()
    upvote_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Post
        fields = (
            "id",
            "title",
            "description",
            "created_by",
            "created_at",
            "is_request",
            "price",
            "is_price_negotiable",
            "status",
            "category",
            "is_archived",
            "is_deleted",
            "image",
            "image_url",
            "upvote_count",
            "vote_log",
        )

    def validate_image(self, image):
        # 12MB
        MAX_FILE_SIZE = 12000000

        if image.size > MAX_FILE_SIZE:
            print(image.size)
            raise serializers.ValidationError("File size too big!")

        return image

    def get_created_by(self, obj):
        name = ""

        if len(obj.created_by.first_name) > 0:
            name += obj.created_by.first_name

        if len(obj.created_by.last_name) > 0:
            if len(name) > 0:
                name += " "

            name += obj.created_by.last_name

        return {"username": obj.created_by.username, "name": name}

    def get_vote_log(self, obj):
        request = self.context.get("request")
        vote_log = VoteLog.objects.get_or_create(
            voted_by=request.user, post=obj
        )[0]
        return VoteLogSerializer(vote_log).data


class BookPostSerializer(PostSerializer):
    book = BookSerializer(required=False)

    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields + ("book",)

    def create(self, validated_data):
        if "book" in validated_data:
            book_data = validated_data.pop("book")
        else:
            book_data = {}

        validated_data["category"] = Category.objects.get(pk=1)
        post = Post.objects.create(**validated_data)
        book_instance = Book.objects.create(post=post, **book_data)
        return post

    def update(self, instance, validated_data):
        if "book" in validated_data:
            book_serializer = self.fields["book"]
            book_data = validated_data.pop("book")
            book_instance = Book.objects.get(post__id=instance.id)
            book_serializer.update(book_instance, book_data)

        return super(BookPostSerializer, self).update(instance, validated_data)


class GroupPostSerializer(PostSerializer):
    group = GroupSerializer(required=False)

    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields + ("group",)

    def to_internal_value(self, data):
        if data.__contains__("group.current_members"):
            data._mutable = True

            # print(data["group.current_members"])
            # print(type(data["group.current_members"]))
            # print(data["group"]["current_members"])
            # print(type(data["group"]["current_members"]))

            data.setlist(
                "group.current_members",
                list(map(int, data["group.current_members"].split(","))),
            )

            data._mutable = False

        # print("here2", data)

        return super(GroupPostSerializer, self).to_internal_value(data)

    def create(self, validated_data):
        if "group" in validated_data:
            group_data = validated_data.pop("group")
        else:
            group_data = {}

        validated_data["category"] = Category.objects.get(name="group")
        post = Post.objects.create(**validated_data)

        current_members = group_data.pop("current_members", None)
        group = Group.objects.create(post=post, **group_data)
        group.current_members.set(current_members)
        group.save()

        return post

    def update(self, instance, validated_data):
        if "group" in validated_data:
            group_data = validated_data.pop("group")
            group_instance = Group.objects.get(post__id=instance.id)
            GroupSerializer().update(group_instance, group_data)

        instance = super().update(instance, validated_data)
        return instance


class ElectronicPostSerializer(PostSerializer):
    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields


class OtherPostSerializer(PostSerializer):
    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields


class SkillListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillList
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ("label", "rating")

    def validate_label(self, value):
        try:
            skill_list_obj = SkillList.objects.get(label=value)
            skill_list_obj.frequency += 1
            skill_list_obj.save()
        except SkillList.DoesNotExist:
            raise serializers.ValidationError(
                {"Error": "Please enter a valid skill label."}
            )

        return value


class SkillPostSerializer(PostSerializer):
    skill = SkillSerializer()

    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields + ("skill",)

    def create(self, validated_data):
        if "skill" in validated_data:
            skill = validated_data.pop("skill")
        else:
            skill = {}

        res = Skill.objects.filter(
            label=skill.get("label"),
            post__created_by__id=self.context.get("request").user.id,
        )

        if len(res) != 0:
            raise serializers.ValidationError(
                {
                    "Error": "Failed to add the skill because you already have a skill post for "
                    + skill.get("label")
                    + "."
                }
            )

        validated_data["category"] = Category.objects.get(name="skill")
        post = Post(**validated_data)

        skill_post = Skill(post=post, **skill)
        post.save()
        skill_post.save()

        return post

    def update(self, instance, validated_data):
        if "skill" in validated_data:
            skill_data = validated_data.pop("skill")
            skill_instance = Skill.objects.get(post__id=instance.id)
            SkillSerializer().update(skill_instance, skill_data)

        instance = super().update(instance, validated_data)
        return instance


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class NotificationSerializer(serializers.ModelSerializer):
    post = serializers.SerializerMethodField()
    text = serializers.ReadOnlyField()

    class Meta:
        model = Notification
        fields = "__all__"

    def get_post(self, obj):
        return {
            "id": obj.post.id,
            "category": obj.post.category.name,
        }
