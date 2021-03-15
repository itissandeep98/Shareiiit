from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post, Category
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    PostSerializer,
    CategorySerializer,
    BookPostSerializer,
    GroupPostSerializer,
)

# Create your views here.


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        print(self.request)
        serializer.save(created_by=self.request.user)


class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookPostSerializer

    def perform_create(self, serializer):
        print(self.request)
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        return Post.objects.filter(category=1)


class GroupViewSet(viewsets.ModelViewSet):
    # queryset = Post.objects.all()
    serializer_class = GroupPostSerializer

    def perform_create(self, serializer):
        print(self.request)
        serializer.save(created_by=self.request.user)

    def get_queryset(self):
        return Post.objects.filter(category=3)


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
