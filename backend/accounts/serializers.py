from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from posts.models import Post

# from posts.serializers import BookPostSerializer
from rest_framework.authtoken.models import Token

# User Serializer
class UserSerializer(serializers.HyperlinkedModelSerializer):
    # posts = serializers.HyperlinkedRelatedField(many=True, view-name="posts", read_only=True)
    # posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # posts = BookPostSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "username",
            "password",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        user.set_password(validated_data["password"])
        user.save()
        Token.objects.create(user=user)
        return user


# # Register Serializer
# class RegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ("id", "first_name", "last_name", "username", "password")
#         extra_kwargs = {"password": {"write_only": True}}

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             validated_data["first_name"],
#             validated_data["last_name"],
#             validated_data["username"],
#             validated_data["password"],
#         )
#         return user


# # Login Serializer
# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField()

#     def validate(self, attrs):
#         user = authenticate(**attrs)

#         if user and user.is_active:
#             return user

#         raise serializers.ValidationError("Incorrect credentials")
