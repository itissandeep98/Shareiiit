from django.urls import path, include
from posts import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"books", views.BookViewSet, basename="books")
router.register(r"mybooks", views.MyBooksViewSet, basename="mybooks")
router.register(r"skills", views.SkillViewSet, basename="skills")
router.register(r"myskills", views.MySkillsViewSet, basename="myskills")
router.register(r"groups", views.GroupViewSet, basename="groups")
router.register(r"posts", views.PostViewSet, basename="posts")
router.register(r"votes", views.VoteViewSet, basename="votes")
# router.register(r"messages", views.MessageViewSet, basename="messages")

urlpatterns = [
    path("", include(router.urls)),
    path("categories/", views.CategoryList.as_view()),
    path("voted/", views.VotedPostsView.as_view()),
    path("messages/", views.MessageViewSet.as_view()),
]