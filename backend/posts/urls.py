from django.urls import path
from posts import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("books", views.BookViewSet, basename="books")
router.register("groups", views.GroupViewSet, basename="groups")
router.register("posts", views.PostViewSet, basename="posts")

urlpatterns = router.urls

urlpatterns += [
    path("categories/", views.CategoryList.as_view()),
]