from django.db.models import fields, Q
from django.contrib.auth import get_user, get_user_model

from rest_framework import serializers

from .models import Message, Conversation
from posts.models import Post

User = get_user_model()


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.CharField(source="sender.username", read_only=True)
    receiver = serializers.CharField(source="receiver.username", read_only=True)
    conversation = serializers.PrimaryKeyRelatedField
    # post = serializers.IntegerField()``

    class Meta:
        model = Message
        fields = ("timestamp", "sender", "receiver", "text")
        read_only_fields = ("receiver", "sender", "timestamp")

    def create(self, validated_data):
        print(validated_data)
        print("Context", self.context)
        conversation_id = validated_data.pop("conversation_id")
        post_id = validated_data.pop("post_id")

        if conversation_id is None:
            # if conv id is none, sender is the user2
            print("hereee")
            user2 = validated_data["sender"]
            post = Post.objects.get(id=post_id)
            conversation = Conversation(user2=user2, post=post)
            conversation.save()
        else:
            conversation = Conversation.objects.get(pk=conversation_id)

        print("here1")
        if self.context.get("request").user is conversation.user2:
            validated_data["receiver"] = conversation.post.created_by
        else:
            validated_data["receiver"] = conversation.user2

        print("receiver", validated_data["receiver"].username)

        # post = self.context["post"]

        # validated_data["receiver"] = User.objects.get(
        #     **validated_data.get("receiver")
        # )

        # try:
        #     conversation = Conversation.objects.get(
        #         Q(user2=validated_data["sender"])
        #         | Q(user2=validated_data["receiver"]),
        #         post__id=post,
        #     )
        # except Conversation.DoesNotExist as e:
        #     print("here")
        #     conversation = Conversation(
        #         user2=validated_data["sender"],
        #         post=Post.objects.get(id=post),
        #     )
        #     conversation.save()

        validated_data["conversation"] = conversation

        message = Message.objects.create(**validated_data)
        return message


class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(source="message_set", many=True)
    user2 = serializers.CharField(source="user2.username")

    class Meta:
        model = Conversation
        fields = ("id", "user2", "messages")

    # def create(self, validated_data):
    #     validated_data["category"] = Category.objects.get(pk=1)
    #     post = Post.objects.create(**validated_data)
    #     book_instance = Book.objects.create(post=post, **book_data)
    #     return post
