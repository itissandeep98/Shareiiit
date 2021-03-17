from django.db.models import fields
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Post, Book, Group, Category, Vote


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ("author",)


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("members_needed",)


class VoteSerializer(serializers.ModelSerializer):
    voted_by = serializers.CharField(source="voted_by.username", read_only=True)

    class Meta:
        model = Vote
        fields = ("id", "voted_by", "post", "choice")

    def validate(self, data):
        voted_by = data.get("voted_by", None)
        post = data.get("post", None)

        try:
            obj = self.Meta.model.objects.get(voted_by=voted_by, post=post)
        except self.Meta.model.DoesNotExist:
            return data

        if self.instance and obj.id == self.instance.id:
            return data
        else:
            raise serializers.ValidationError("voted_by with post already exists")

    # def validate(self, attrs):
    #     voted_by = attrs.get("voted_by", self.instance.voted_by)
    #     post = attrs.get("post", self.instance.post)

    #     try:
    #         obj = Vote.objects.get(voted_by=voted_by, post=post)
    #     except:
    #         pass

    #     if self.instance and obj.id == self.instance.id:
    #         return attrs
    #     else:
    #         raise serializers.ValidationError("voted_by with post already exists")

    # def create(self, validated_data):

    #     Vote.objects.create(**validated_data)


class PostSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source="created_by.username", read_only=True)
    # book = BookSerializer()
    # item = serializers.PrimaryKeyRelatedField(read_only=True)
    category = serializers.SlugRelatedField(read_only=True, slug_field="name")

    class Meta:
        model = Post
        fields = ("id", "title", "body", "created_by", "is_request", "category")


class BookPostSerializer(PostSerializer):
    book = BookSerializer(required=False)
    votes = VoteSerializer(read_only=True, many=True)
    current_user_vote_id = serializers.SerializerMethodField()

    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields + ("book", "user_vote", "votes")

    def get_current_user_vote_id(self, obj):
        try:
            id = Vote.objects.get(
                post__id=obj.id, voted_by=self.context["request"].user
            ).id
        except:
            id = None
        return id

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


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"