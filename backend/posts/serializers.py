from django.db.models import fields
from rest_framework import serializers
from .models import Post, Book, Group, Category


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ("id", "author")


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("id", "members_needed")


class PostSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source="created_by.username", read_only=True)
    # book = BookSerializer()
    # item = serializers.PrimaryKeyRelatedField(read_only=True)
    category = serializers.SlugRelatedField(read_only=True, slug_field="name")

    class Meta:
        model = Post
        fields = ("id", "title", "body", "created_by", "is_request", "category")


class BookPostSerializer(PostSerializer):
    book = BookSerializer()

    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields + ("book",)

    def create(self, validated_data):
        book_data = validated_data.pop("book")
        validated_data["category"] = Category.objects.get(pk=1)
        post = Post.objects.create(**validated_data)
        book = Book.objects.create(post=post, **book_data)
        return post

    # def update(self, instance, validated_data):
    #     book_data = validated_data.pop("book")
    #     book =
    #     post =
    #     book = Book.objects.create(post=post, **book_data)
    #     return post


class GroupPostSerializer(PostSerializer):
    group = GroupSerializer()

    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields + ("group",)

    def create(self, validated_data):
        group_data = validated_data.pop("group")
        validated_data["category"] = Category.objects.get(pk=3)
        post = Post.objects.create(**validated_data)
        group = Group.objects.create(post=post, **group_data)
        return post


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"