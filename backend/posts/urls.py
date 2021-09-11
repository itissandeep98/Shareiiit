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
router.register(r"myposts", views.MyPostsViewSet, basename="myposts")
# router.register(r"votes", views.VoteViewSet, basename="votes")
# router.register(r"messages", views.MessageViewSet, basename="messages")

urlpatterns = [
    path("", include(router.urls)),
    path("categories/", views.CategoryListView.as_view()),
    path("skilllist/", views.SkillListView.as_view()),
    path("votelog/", views.VoteLogView.as_view()),
    path("myactivity/", views.VotedPostsView.as_view()),
]