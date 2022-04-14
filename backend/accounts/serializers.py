from rest_framework import serializers

# from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from posts.models import Post

from django.contrib.auth import get_user_model

from accounts.models import Profile, UserFollowing

from drf_extra_fields.relations import PresentablePrimaryKeyRelatedField

User = get_user_model()

from rest_framework.authtoken.models import Token


class OSADetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "first_name", "last_name")
        extra_kwargs = {"username": {"read_only": True}}


class UserFollowingSerializer(serializers.ModelSerializer):
    user = PresentablePrimaryKeyRelatedField(
        queryset=User.objects.all(),
        presentation_serializer=OSADetailsSerializer,
    )

    class Meta:
        model = UserFollowing
        fields = ("id", "user")


class ProfileSerializer(serializers.ModelSerializer):
    follower_count = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        exclude = ("user",)

    def get_follower_count(self, obj):
        # how many times current user appears as the following relation in UserFollowing
        return obj.user.following.count()


class UserCardSerializer(serializers.ModelSerializer):
    bio = serializers.CharField(source="profile.bio")
    image = serializers.ImageField(source="profile.image")

    class Meta:
        model = User
        fields = ("name", "bio", "image")


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    following = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "password",
            "profile",
            "following",
        )

        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        user.set_password(validated_data["password"])
        user.save()
        Token.objects.create(user=user)
        return user

    def get_following(self, obj):
        following_user = self.context["request"].user

        try:
            instance = UserFollowing.objects.get(
                user=obj, following_user=following_user
            )
            return {"id": instance.id, "state": True}

        except:
            return {"state": False}
