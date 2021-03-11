from django.db.models import fields
from rest_framework import serializers
from .models import Post


# class BookSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Book
#         fields = (
#             "id",
#             "author",
#         )


class PostSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source="created_by.username", read_only=True)
    # book = BookSerializer()
    # item = serializers.PrimaryKeyRelatedField(read_only=True)
    # group = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Post
        fields = ("id", "title", "body", "created_by", "is_request", "category")