from django.contrib.auth import get_user_model

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
)

# from django.contrib.auth.models import User


User = get_user_model()


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ("author",)


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("members_needed",)


class VoteCountLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteCountLog
        fields = ("upvote_count",)


class VoteLogSerializer(serializers.ModelSerializer):
    # document_id = serializers.IntegerField()

    class Meta:
        model = VoteLog
        fields = ("upvoted_flag", "saved_flag", "dismiss_flag")
        read_only_fields = ("timestamp",)

    def update(self, instance, validated_data):
        # override the update method to update doc count log
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
    created_by = serializers.CharField(
        source="created_by.username", read_only=True
    )
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
            "is_expired",
            "is_deleted",
            "image_url",
            "upvote_count",
            "vote_log",
        )

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

    def create(self, validated_data):
        if "group" in validated_data:
            group_data = validated_data.pop("group")
        else:
            group_data = {}

        validated_data["category"] = Category.objects.get(name="group")
        post = Post.objects.create(**validated_data)
        group = Group.objects.create(post=post, **group_data)
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
        fields = (
            "id",
            "name",
        )


class SkillSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = ("name", "rating", "type")

    def get_type(self, obj):
        return SkillList.objects.get(name=obj.name).type


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
            name=skill.get("name"),
            post__created_by__id=self.context.get("request").user.id,
        )

        if len(res) != 0:
            raise serializers.ValidationError(
                {
                    "Error": "Failed to add the skill because you already have a skill post for "
                    + skill.get("name")
                    + "."
                }
            )

        validated_data["category"] = Category.objects.get(name="skill")
        post = Post(**validated_data)

        try:
            skill_list_obj = SkillList.objects.get(name=skill.get("name"))
            skill_list_obj.frequency += 1
            skill_list_obj.save()
        except SkillList.DoesNotExist:
            raise serializers.ValidationError(
                {"Error": "Please enter a valid skill name."}
            )

        skill_post = Skill(post=post, **skill)
        post.save()
        skill_post.save()

        return post


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"