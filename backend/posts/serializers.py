from django.contrib.auth import get_user_model

from rest_framework.validators import UniqueTogetherValidator
from rest_framework import serializers

from .models import (
    Post,
    Book,
    Group,
    Category,
    Vote,
    Skill,
    SkillList,
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


class VotedPostSerializer(serializers.ModelSerializer):
    voted_by = serializers.CharField(source="voted_by.username", read_only=True)
    # post = serializers.SerializerMethodField()

    class Meta:
        model = Vote
        fields = ("id", "voted_by", "choice", "post")

    def to_representation(self, obj):
        rep = super().to_representation(obj)

        print("Context request:", self.context["request"])

        args = {obj.post}
        kwargs = {"context": {"request": self.context["request"]}}

        serializer = None
        category = self.context.get("request").query_params.get("category")

        if category == "book":
            serializer = BookPostSerializer(*args, **kwargs)

        rep["post"] = serializer.data

        return rep

    # def get_post(self, obj):
    #     try:
    #         qs = Post.objects.get(id=obj.post.id)
    #         # print(qs)
    #         # print("Post Detail Context User", self.context)
    #         # print()

    #         serializer = BookPostSerializer(
    #             instance=qs, context={"request": self.context["request"]}
    #         )

    #         return serializer.data
    #     except Exception as e:
    #         print("Exception" + str(e))
    #         print("book=", qs)
    #         print()
    #         return None


class VoteSerializer(serializers.ModelSerializer):
    voted_by = serializers.CharField(source="voted_by.username", read_only=True)
    # post = serializers.SerializerMethodField()

    class Meta:
        model = Vote
        fields = ("id", "voted_by", "post", "choice")

    def validate(self, data):
        """
        Data.get("user") cannot be used here because validate is called before voted_by parameter is added to the data. But it is necessary to call it because the entire validated_data is used in the create method of the VoteSerializer.
        """

        voted_by = self.context["request"].user
        post = data.get("post", None)
        choice = data.get("choice", None)

        try:
            obj = self.Meta.model.objects.get(
                voted_by=voted_by, post=post, choice=choice
            )
        except self.Meta.model.DoesNotExist:
            return data

        if self.instance and obj.id == self.instance.id:
            return data
        else:
            raise serializers.ValidationError(
                f"User has already voted {choice} on this post."
            )


class PostSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(
        source="created_by.username", read_only=True
    )
    # book = BookSerializer()
    # item = serializers.PrimaryKeyRelatedField(read_only=True)
    category = serializers.SlugRelatedField(read_only=True, slug_field="name")

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
        )


class BookPostSerializer(PostSerializer):
    book = BookSerializer(required=False)
    # votes = VoteSerializer(read_only=True, many=True)
    # upvotes = serializers.SerializerMethodField()
    upvotes = serializers.IntegerField(read_only=True)
    current_user_votes = serializers.SerializerMethodField()

    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields + (
            "book",
            "upvotes",
            "current_user_votes",
        )

    def get_current_user_votes(self, obj):
        qs = Vote.objects.filter(
            post__id=obj.id, voted_by=self.context["request"].user
        )
        serializer = VoteSerializer(instance=qs, many=True)
        return serializer.data

    # def get_upvotes(self, obj):
    #     return Vote.objects.filter(post__id=obj.id, choice__name="upvote").count()

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
            book_data = validated_data.pop("book")
            book_instance = Book.objects.get(post__id=instance.id)
            BookSerializer().update(book_instance, book_data)

        # book_instance.author = book_data.get("author", book_instance.author)
        # book_instance.save()

        instance = super().update(instance, validated_data)
        return instance


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

        validated_data["category"] = Category.objects.get(pk=3)
        post = Post.objects.create(**validated_data)
        group = Group.objects.create(post=post, **group_data)
        return post

    def update(self, instance, validated_data):
        if "group" in validated_data:
            group_data = validated_data.pop("group")
            group_instance = Group.objects.get(post__id=instance.id)
            GroupSerializer().update(group_instance, group_data)

        # group_instance.author = book_data.get("author", group_instance.author)
        # group_instance.save()

        instance = super().update(instance, validated_data)
        return instance


class SkillListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillList
        fields = ("id", "name", "type")
        read_only_fields = ("type",)
        # read_only_fields = ("name",)


class SkillSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = ("name", "rating", "type")

    def get_type(self, obj):
        return SkillList.objects.get(name=obj.name).type.name


class SkillPostSerializer(PostSerializer):
    skill = SkillSerializer(required=False)
    # upvotes = serializers.SerializerMethodField()
    upvotes = serializers.IntegerField(read_only=True)
    current_user_votes = serializers.SerializerMethodField()

    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields + (
            "skill",
            "upvotes",
            "current_user_votes",
        )

    def get_current_user_votes(self, obj):
        qs = Vote.objects.filter(
            post__id=obj.id, voted_by=self.context["request"].user
        )
        serializer = VoteSerializer(instance=qs, many=True)
        return serializer.data

    # def get_upvotes(self, obj):
    #     return Vote.objects.filter(post__id=obj.id, choice__name="upvote").count()

    def create(self, validated_data):
        if "skill" in validated_data:
            skill = validated_data.pop("skill")
        else:
            skill = {}

        print(skill)
        # print(skill["skill_item"])

        validated_data["category"] = Category.objects.get(name="skill")
        post = Post(**validated_data)

        # skill_item_name = skill.pop("skill_item").get("name")
        # print("skill_item_name", skill_item_name)

        try:
            SkillList.objects.get(name=skill.get("name"))
        except SkillList.DoesNotExist:
            raise serializers.ValidationError(
                {"Skill list": "Please enter a valid skill name."}
            )

        skill_instance = Skill(post=post, **skill)

        post.save()
        skill_instance.save()

        return post


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"