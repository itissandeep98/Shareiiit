from django.shortcuts import render
from django.db.models import Q

from rest_framework import generics, permissions, mixins, viewsets

from .serializers import (
    MessageSerializer,
    ConversationSerializer,
    NotificationSerializer,
)
from .models import Conversation, Message, Notification

# Create your views here.


class ConversationView(generics.ListAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        post = self.request.query_params.get("post")
        return Conversation.objects.filter(
            Q(user2=user) | Q(post__created_by=user), post=post
        )


class MessageView(generics.CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        print(self.request.data)
        conversation_id = self.request.query_params.get("conversation")
        post_id = self.request.query_params.get("post")
        serializer.save(
            sender=self.request.user,
            conversation_id=conversation_id,
            post_id=post_id,
        )


class NotificationView(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(message__receiver=self.request.user)
