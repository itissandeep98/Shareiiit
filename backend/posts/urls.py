from django.urls import path
from posts import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("posts", views.PostViewSet, basename="posts")

urlpatterns = router.urls

# urlpatterns = [
#     path("posts/", views.PostList.as_view()),
#     path("posts/<int:pk>/", views.PostDetail.as_view()),
# ]