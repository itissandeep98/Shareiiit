from django.db.models import query, Count, Q, F
from django.shortcuts import get_object_or_404


from rest_framework import generics, permissions, viewsets, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from rest_framework.decorators import action


from django_filters.rest_framework import DjangoFilterBackend

from .models import Post, Category, Skill, SkillList, VoteLog
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


def get_search_kwargs(request, category):
    """
    Function to extract possible search paramaters based on category.
    """
    kwargs = {}

    title__icontains = request.query_params.get("title")
    description__icontains = request.query_params.get("description")
    created_by__username__icontains = request.query_params.get("username")
    author = request.query_params.get("author")
    is_request = request.query_params.get("is_request")
    members_needed = request.query_params.get("members_needed")

    if title__icontains:
        kwargs["title__icontains"] = title__icontains

    if description__icontains:
        kwargs["description__icontains"] = description__icontains

    if created_by__username__icontains:
        kwargs[
            "created_by__username__icontains"
        ] = created_by__username__icontains

    if category in ("book", "electronic", "other"):
        if is_request is not None:
            kwargs["is_request"] = is_request

    if category == "book":
        if author is not None:
            kwargs["book__author__icontains"] = author

    if category == "group":
        if members_needed is not None:
            kwargs["group__members_needed"] = members_needed

    if category == "skill":
        rating = request.query_params.get("rating")
        label = request.query_params.get("label")

        if rating is not None:
            kwargs["skill__rating"] = rating

        if label is not None:
            kwargs["skill__label__icontains"] = label

    return kwargs


class CustomSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        search_fields = [
            "created_by__username",
            "created_by__first_name",
            "created_by__last_name",
            "title",
            "description",
        ]

        category = request.query_params.get("category")

        if category == "book":
            search_fields += ["book__author"]
        elif category == "group":
            search_fields += ["group__members_needed"]
        elif category == "skill":
            search_fields += ["skill__label", "skill__rating"]

        return search_fields


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Viewset to handle requests to /posts/
    """

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
        # filters.SearchFilter,
        CustomSearchFilter,
        filters.OrderingFilter,
    ]

    # search_fields = ["created_by__username", "title", "description"]
    ordering_fields = ["upvote_count", "created_at"]

    def get_serializer_class(self):
        category = self.request.query_params.get("category")

        if category is None:
            raise APIException("Please specify post category.")

        print(self.serializer_classes.get(category))

        return self.serializer_classes.get(category)

    def get_queryset(self):
        category = self.request.query_params.get("category")
        show_dismissed = self.request.query_params.get("show_dismissed", False)

        if category is None:
            raise APIException("Please specify post category.")

        if show_dismissed:
            dismissed_posts = []
        else:
            dismissed_posts = [
                o.post.id
                for o in VoteLog.objects.filter(
                    voted_by=self.request.user.id, dismiss_flag=True
                )
            ]

        # Search should exclude only deleted and expired posts, and dismissed posts based on show_dismissed flag.

        deleted_posts = list(
            Post.objects.filter(is_deleted=True).values_list("id", flat=True)
        )

        expired_posts = list(
            Post.objects.filter(is_expired=True).values_list("id", flat=True)
        )

        queryset = (
            Category.objects.get(name=category)
            .post_set.exclude(
                id__in=deleted_posts + expired_posts + dismissed_posts
            )
            .filter(**get_search_kwargs(self.request, category))
            .all()
            .annotate(upvote_count=F("vote_count_log__upvote_count"))
        )

        return queryset


class MyPostsViewSet(viewsets.ModelViewSet):
    """
    Viewset to handle requests to /myposts/
    """

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
        return Response({"status": "post deleted successfully"})


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset is now redundant since requests for skills are being directed to /posts/
    """

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
    """
    This viewset is now redundant since requests for myskills are being directed to /myposts/
    """

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
    """
    View to get the posts a user has interacted with, i.e. "My Acticity" page.
    """

    permission_classes = [permissions.IsAuthenticated]

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


class CategoryListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SkillListView(generics.ListAPIView):
    """
    Viewset to get the list of all possible skills a user can choose from while creating a skill category post.
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SkillListSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["label"]

    def get_queryset(self):
        popular = self.request.query_params.get("popular", False)

        if popular:
            return SkillList.objects.all()[:10]

        return SkillList.objects.all()


class VoteLogView(generics.RetrieveUpdateAPIView):
    """
    View to get and update the vote log of the user on a specific post.
    """

    serializer_class = VoteLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        post = self.request.query_params.get("post")

        return VoteLog.objects.get_or_create(
            voted_by=self.request.user,
            post__id=post,
        )[0]