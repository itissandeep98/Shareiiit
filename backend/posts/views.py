from django.db.models import query
from django.shortcuts import get_object_or_404

from rest_framework import generics, permissions, viewsets, serializers
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Post, Category, Vote
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    PostSerializer,
    CategorySerializer,
    BookPostSerializer,
    GroupPostSerializer,
    VoteSerializer,
    VotedPostSerializer,
)

# Create your views here.


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        print(self.request)
        serializer.save(created_by=self.request.user)


class BookViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = BookPostSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    # def perform_create(self, serializer):
    #     print(self.request)
    #     serializer.save(created_by=self.request.user)

    def get_queryset(self):
        return Post.objects.filter(category=1)


class MyBooksViewSet(viewsets.ModelViewSet):
    serializer_class = BookPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        print(self.request)
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        posts = Post.objects.filter(created_by__id=self.request.user.id, category=1)
        print(posts)
        return posts


class VotedPostsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = VotedPostSerializer

    def get_queryset(self):
        choice = self.request.query_params.get("choice")
        category = self.request.query_params.get("category")

        queryset = Vote.objects.all()

        kwargs = {"voted_by__id": self.request.user.id}

        if choice:
            kwargs["choice__name"] = choice
        if category:
            kwargs["post__category__name"] = category

        queryset = queryset.filter(**kwargs)
        return queryset


class GroupViewSet(viewsets.ModelViewSet):
    # queryset = Post.objects.all()
    serializer_class = GroupPostSerializer

    def perform_create(self, serializer):
        print(self.request)
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        return Post.objects.filter(category=3)


class VoteViewSet(viewsets.ModelViewSet):
    serializer_class = VoteSerializer
    queryset = Vote.objects.all()

    def perform_create(self, serializer):
        # try:
        serializer.save(voted_by=self.request.user)
        # except:
        # raise serializers.ValidationError("voted_by with post already exists")


# class VoteUpdateView(generics.UpdateAPIView):
#     serializer_class = VoteSerializer
#     queryset = Vote.objects.all()


class CategoryList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# class PostList(generics.ListCreateAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

# permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# def perform_create(self, serializer):
#     serializer.save(owner=self.request.user)


# class PostDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]
