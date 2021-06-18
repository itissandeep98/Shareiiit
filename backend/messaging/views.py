from django.shortcuts import render
from django.db.models import Q

from rest_framework import generics, permissions

from .serializers import MessageSerializer, ConversationSerializer
from .models import Conversation, Message

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

    # filter_backends = [
    #     DjangoFilterBackend,
    #     filters.OrderingFilter,
    # ]

    ordering = ["-created_at"]

    def perform_create(self, serializer):
        print(self.request.data)
        conversation_id = self.request.query_params.get("conversation")
        post_id = self.request.query_params.get("post")
        serializer.save(
            sender=self.request.user,
            conversation_id=conversation_id,
            post_id=post_id,
        )

    # def get_serializer_context(self):
    # context = super().get_serializer_context()
    # context["post"] = self.request.data.pop("post")
    # return context

    # def get_queryset(self):
    #     queryset = Message.objects.all()
    #     post = self.request.query_params.get("post")
    #     user1 = self.request.user.username
    #     user2 = self.request.query_params.get("user2")

    #     print(post, user1, user2)

    #     queryset = queryset.filter(
    #         Q(sender__username=user1) | Q(sender__username=user2),
    #         Q(recipient__username=user1) | Q(recipient__username=user2),
    #         post__id=post,
    #     )

    #     # kwargs = {"voted_by__id": self.request.user.id}

    #     # if choice:
    #     #     kwargs["choice__name"] = choice
    #     # if category:
    #     #     kwargs["post__category__name"] = category

    #     # queryset = queryset.filter(**kwargs)
    #     return queryset

    #     return queryset
