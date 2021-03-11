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
    owner = serializers.CharField(source="owner.username", read_only=True)
    # book = BookSerializer()
    # item = serializers.PrimaryKeyRelatedField(read_only=True)
    # group = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Post
        fields = ("id", "title", "body", "owner")