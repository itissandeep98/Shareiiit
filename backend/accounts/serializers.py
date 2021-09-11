from rest_framework import serializers

# from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from posts.models import Post

from django.contrib.auth import get_user_model

from accounts.models import Profile

User = get_user_model()

from rest_framework.authtoken.models import Token


class ProfileSerializer(serializers.ModelSerializer):
    photo = serializers.CharField(source="photo.url", read_only=True)

    class Meta:
        model = Profile
        exclude = ("user",)


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "password",
            "profile",
        )

        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # print(validated_data)
        user = User(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        user.set_password(validated_data["password"])
        user.save()
        Token.objects.create(user=user)
        return user


class OSADetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "username")
        extra_kwargs = {"username": {"read_only": True}}

    # def update(self, instance, validated_data):
    #     profile_data = validated_data.pop("profile", None)

    #     if profile_data is not None:
    #         profile_serializer = self.fields["profile"]
    #         profile_serializer.update(instance.profile, profile_data)

    #     return super(UserDetailsSerializer, self).update(
    #         instance, validated_data
    #     )