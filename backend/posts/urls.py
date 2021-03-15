from django.urls import path, include
from posts import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"books", views.BookViewSet, basename="books")
router.register(r"groups", views.GroupViewSet, basename="groups")
router.register(r"posts", views.PostViewSet, basename="posts")

urlpatterns = [
    path("", include(router.urls)),
    path("categories/", views.CategoryList.as_view()),
]