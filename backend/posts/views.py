from django.db.models import query, Count, Q
from django.shortcuts import get_object_or_404


from rest_framework import generics, permissions, viewsets, filters
from rest_framework.views import APIView
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from .models import Post, Category, SkillList, VoteLog
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    PostSerializer,
    CategorySerializer,
    BookPostSerializer,
    GroupPostSerializer,
    SkillListSerializer,
    VoteLogSerializer,
    SkillPostSerializer,
)

# Create your views here.


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        # print(self.request)
        serializer.save(created_by=self.request.user)


class BookViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = BookPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = ["created_by__username", "title", "description"]

    def get_queryset(self):
        kwargs = {}

        title__icontains = self.request.query_params.get("title")
        description__icontains = self.request.query_params.get("description")
        created_by__username__icontains = self.request.query_params.get(
            "username"
        )
        author = self.request.query_params.get("author")
        is_request = self.request.query_params.get("is_request")

        if title__icontains:
            kwargs["title__icontains"] = title__icontains

        if description__icontains:
            kwargs["description__icontains"] = description__icontains

        if created_by__username__icontains:
            kwargs[
                "created_by__username__icontains"
            ] = created_by__username__icontains

        if author:
            kwargs["book__author__icontains"] = author

        if is_request:
            kwargs["is_request"] = is_request

        queryset = Post.objects.filter(category__name="book", **kwargs)

        return queryset


class MyBooksViewSet(viewsets.ModelViewSet):
    serializer_class = BookPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,
    ]

    ordering = ["-created_at"]

    def perform_create(self, serializer):
        print(self.request)
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        queryset = Post.objects.filter(
            created_by__id=self.request.user.id, category__name="book"
        )

        return queryset


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SkillPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = ["created_by__username", "title", "description"]

    def get_queryset(self):
        kwargs = {}

        skill__skill_item__name__icontains = self.request.query_params.get(
            "name"
        )
        description__icontains = self.request.query_params.get("body")
        created_by__username__icontains = self.request.query_params.get(
            "username"
        )
        is_request = self.request.query_params.get("is_request")
        rating = self.request.query_params.get("rating")

        if skill__skill_item__name__icontains:
            kwargs[
                "skill__skill_item__name__icontains"
            ] = skill__skill_item__name__icontains

        if description__icontains:
            kwargs["description__icontains"] = description__icontains

        if created_by__username__icontains:
            kwargs[
                "created_by__username__icontains"
            ] = created_by__username__icontains

        if is_request:
            kwargs["is_request"] = is_request

        if rating:
            kwargs["skill__rating"] = rating

        queryset = Post.objects.filter(category__name="skill", **kwargs)

        return queryset


class MySkillsViewSet(viewsets.ModelViewSet):
    serializer_class = SkillPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,
    ]

    ordering = ["-created_at"]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        queryset = Post.objects.filter(
            created_by__id=self.request.user.id, category__name="skill"
        )

        return queryset


# class VotedPostsView(generics.ListAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = VotedPostSerializer

#     def get_queryset(self):
#         choice = self.request.query_params.get("choice")
#         category = self.request.query_params.get("category")

#         queryset = Vote.objects.all()

#         kwargs = {"voted_by__id": self.request.user.id}

#         if choice:
#             kwargs["choice__name"] = choice
#         if category:
#             kwargs["post__category__name"] = category

#         queryset = queryset.filter(**kwargs)
#         return queryset


class GroupViewSet(viewsets.ModelViewSet):
    # queryset = Post.objects.all()
    serializer_class = GroupPostSerializer

    def perform_create(self, serializer):
        # print(self.request)
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        return Post.objects.filter(category__name="group")


# class VoteViewSet(viewsets.ModelViewSet):
#     serializer_class = VoteSerializer
#     queryset = Vote.objects.all()

#     def perform_create(self, serializer):
#         # try:
#         serializer.save(voted_by=self.request.user)
#         # except:
#         # raise serializers.ValidationError("voted_by with post already exists")


# class VoteUpdateView(generics.UpdateAPIView):
#     serializer_class = VoteSerializer
#     queryset = Vote.objects.all()


class CategoryListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SkillListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = SkillList.objects.all()
    serializer_class = SkillListSerializer


class VoteLogView(generics.RetrieveUpdateAPIView):
    serializer_class = VoteLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        post = self.request.query_params.get("post")

        return VoteLog.objects.get_or_create(
            voted_by=self.request.user,
            post__id=post,
        )[0]