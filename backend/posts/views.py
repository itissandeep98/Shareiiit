from django.db.models import query, Count, Q
from django.shortcuts import get_object_or_404


from rest_framework import generics, permissions, viewsets, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from rest_framework.decorators import action


from django_filters.rest_framework import DjangoFilterBackend

from .models import Post, Category, SkillList, VoteLog
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    ElectronicPostSerializer,
    OtherPostSerializer,
    PostSerializer,
    CategorySerializer,
    BookPostSerializer,
    GroupPostSerializer,
    SkillListSerializer,
    VoteLogSerializer,
    SkillPostSerializer,
)

# Create your views here.


# class DynamicSearchFilter(filters.SearchFilter):
#     def get_search_fields(self, view, request):
#         return request.GET.getlist("search_fields", [])


def get_search_kwargs(request):
    kwargs = {}

    title__icontains = request.query_params.get("title")
    description__icontains = request.query_params.get("description")
    created_by__username__icontains = request.query_params.get("username")
    author = request.query_params.get("author")
    is_request = request.query_params.get("is_request")

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

    if is_request is not None:
        kwargs["is_request"] = is_request

    return kwargs


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (permissions.AllowAny,)
    # serializer_class = PostSerializer

    serializer_classes = {
        "book": BookPostSerializer,
        "group": GroupPostSerializer,
        "electronic": ElectronicPostSerializer,
        "other": OtherPostSerializer,
        "skill": SkillPostSerializer,
    }

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = ["created_by__username", "title", "description"]
    # ordering_fields = ["-created-at"]
    ordering = ["-vote_count_log__upvote_count"]

    def get_serializer_class(self):
        category = self.request.query_params.get("category")

        if category is None:
            raise APIException("Please specify post category.")

        print(self.serializer_classes.get(category))

        return self.serializer_classes.get(category)

    def get_queryset(self):
        category = self.request.query_params.get("category")

        if category is None:
            raise APIException("Please specify post category.")

        dismissed_posts = VoteLog.objects.filter(
            voted_by=self.request.user.id, dismiss_flag=True
        ).values_list("post", flat=True)

        deleted_posts = Post.objects.filter(is_deleted=True).values_list(
            "id", flat=True
        )

        expired_posts = Post.objects.filter(is_expired=True).values_list(
            "id", flat=True
        )

        queryset = (
            Category.objects.get(name=category)
            .post_set.exclude(
                id__in=[dismissed_posts, deleted_posts, expired_posts]
            )
            .filter(**get_search_kwargs(self.request))
            .all()
        )

        # print(queryset[0].vote_count_log.upvote_count)

        return queryset


class MyPostsViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,
    ]

    ordering_fields = []
    ordering = ["-created_at"]

    serializer_classes = {
        "book": BookPostSerializer,
        "group": GroupPostSerializer,
        "electronic": ElectronicPostSerializer,
        "other": OtherPostSerializer,
        "skill": SkillPostSerializer,
    }

    def get_serializer_class(self):
        category = self.request.query_params.get("category")

        if category is None:
            raise APIException("Please specify post category.")

        print(self.serializer_classes.get(category))

        return self.serializer_classes.get(category)

    def perform_create(self, serializer):
        category = self.request.query_params.get("category")
        serializer.save(
            created_by=self.request.user,
            category=Category.objects.get(name=category),
        )

    # def perform_update(self, serializer):
    # category = self.request.data.get("category",self.request.query_params.get("category"))

    def get_queryset(self):
        category = self.request.query_params.get("category")

        deleted_posts = Post.objects.filter(is_deleted=True).values_list(
            "id", flat=True
        )

        queryset = Post.objects.exclude(id__in=deleted_posts).filter(
            created_by__id=self.request.user.id, category__name=category
        )

        return queryset

    @action(detail=True, methods=["post"])
    def delete(self, request, pk=None):
        post = self.get_object()
        post.is_deleted = True
        post.save()
        return Response({"status": "post deleted"})


# class BookViewSet(viewsets.ReadOnlyModelViewSet):
#     serializer_class = BookPostSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     filter_backends = [
#         DjangoFilterBackend,
#         filters.SearchFilter,
#         filters.OrderingFilter,
#     ]

#     search_fields = ["created_by__username", "title", "description"]

#     def get_queryset(self):
#         kwargs = {}

#         title__icontains = self.request.query_params.get("title")
#         description__icontains = self.request.query_params.get("description")
#         created_by__username__icontains = self.request.query_params.get(
#             "username"
#         )
#         author = self.request.query_params.get("author")
#         is_request = self.request.query_params.get("is_request")
#         upvoted = self.request.query_params.get("upvoted")
#         saved = self.request.query_params.get("saved")
#         dismiss = self.request.query_params.get("dismiss")

#         if title__icontains:
#             kwargs["title__icontains"] = title__icontains

#         if description__icontains:
#             kwargs["description__icontains"] = description__icontains

#         if created_by__username__icontains:
#             kwargs[
#                 "created_by__username__icontains"
#             ] = created_by__username__icontains

#         if author:
#             kwargs["book__author__icontains"] = author

#         if is_request is not None:
#             kwargs["is_request"] = is_request

#         queryset = Post.objects.filter(category__name="book", **kwargs)

#         return queryset


# class MyBooksViewSet(viewsets.ModelViewSet):
#     serializer_class = BookPostSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     filter_backends = [
#         DjangoFilterBackend,
#         filters.OrderingFilter,
#     ]

#     ordering = ["-created_at"]

#     def perform_create(self, serializer):
#         print(self.request)
#         serializer.save(created_by=self.request.user)

#     def get_queryset(self):
#         queryset = Post.objects.filter(
#             created_by__id=self.request.user.id, category__name="book"
#         )

#         """
#         vote = from query params
#         VoteLog.objects.filter(voted_by=user, is_upvoted=true)
#         """

#         return queryset


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SkillPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = [
        "created_by__username",
        "title",
        "skill__name",
        "description",
    ]

    def get_queryset(self):
        kwargs = {}

        skill__name__icontains = self.request.query_params.get("name")
        description__icontains = self.request.query_params.get("body")
        created_by__username = self.request.query_params.get("username")
        is_request = self.request.query_params.get("is_request")
        rating = self.request.query_params.get("rating")

        if skill__name__icontains:
            kwargs["skill__name__icontains"] = skill__name__icontains

        if description__icontains:
            kwargs["description__icontains"] = description__icontains

        if created_by__username:
            kwargs["created_by__username"] = created_by__username

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


class VotedPostsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_classes = {
        "book": BookPostSerializer,
        "skill": SkillPostSerializer,
    }

    def get_serializer_class(self):
        category = self.request.query_params.get("category")

        if category is None:
            raise APIException("Please specify post category.")

        return self.serializer_classes.get(category)

    def get_queryset(self):
        category = self.request.query_params.get("category")
        choice = self.request.query_params.get("choice")

        kwargs = {"voted_by__id": self.request.user.id}

        if choice == "upvoted":
            kwargs["upvoted_flag"] = True
        elif choice == "saved":
            kwargs["saved_flag"] = True
        elif choice == "dismissed":
            kwargs["dismiss_flag"] = True
        else:
            raise APIException("Please specify a valid choice query paramater.")

        vote_logs = VoteLog.objects.all()
        vote_logs = vote_logs.filter(**kwargs)

        posts = []

        for vote_log in vote_logs:
            posts.append(vote_log.post.pk)

        queryset = Post.objects.filter(category__name=category, pk__in=posts)

        return queryset


# class GroupViewSet(viewsets.ModelViewSet):
#     # queryset = Post.objects.all()
#     serializer_class = GroupPostSerializer

#     def perform_create(self, serializer):
#         # print(self.request)
#         serializer.save(created_by=self.request.user)

#     def get_queryset(self):
#         return Post.objects.filter(category__name="group")


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