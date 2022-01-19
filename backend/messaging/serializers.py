from django.db.models import fields, Q
from django.contrib.auth import get_user, get_user_model

from rest_framework import serializers

from .models import Message, Conversation, Notification
from posts.models import Post

User = get_user_model()


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.CharField(source="sender.username", read_only=True)
    sender_photo = serializers.ImageField(
        source="sender.profile.image", read_only=True
    )
    receiver = serializers.CharField(source="receiver.username", read_only=True)
    conversation = serializers.PrimaryKeyRelatedField

    class Meta:
        model = Message
        fields = ("timestamp", "sender", "sender_photo", "receiver", "text")
        read_only_fields = ("receiver", "sender", "timestamp")

    def create(self, validated_data):
        conversation_id = validated_data.pop("conversation_id")
        post_id = validated_data.pop("post_id")

        if conversation_id is None:
            # if conv id is none, i.e. new conversation is being initiated by sender, so sender becomes user2
            user2 = validated_data["sender"]
            post = Post.objects.get(id=post_id)
            conversation = Conversation(user2=user2, post=post)
            conversation.save()
        else:
            conversation = Conversation.objects.get(pk=conversation_id)

        if self.context.get("request").user.id == conversation.user2.id:
            validated_data["receiver"] = conversation.post.created_by
        else:
            validated_data["receiver"] = conversation.user2

        validated_data["conversation"] = conversation

        message = Message.objects.create(**validated_data)
        return message


class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(source="message_set", many=True)
    user2 = serializers.CharField(source="user2.username")

    class Meta:
        model = Conversation
        fields = ("id", "user2", "messages")


class NotificationSerializer(serializers.ModelSerializer):
    text = serializers.SerializerMethodField()
    post = serializers.SerializerMethodField()
    timestamp = serializers.DateTimeField(source="message.timestamp")

    class Meta:
        model = Notification
        fields = (
            "id",
            "read",
            "post",
            "timestamp",
            "text",
        )

    def get_text(self, obj):
        return f"You have a new message from {obj.message.sender.username} - ({obj.message.text[:10]}...)"

    def get_post(self, obj):
        return {
            "id": obj.message.conversation.post.id,
            "category": obj.message.conversation.post.category.name,
        }
