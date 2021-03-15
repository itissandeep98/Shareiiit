from django.urls import path, include

# from .api import RegisterAPI, LoginAPI, UserAPI
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("users", views.UserViewSet, basename="users")
urlpatterns = router.urls


urlpatterns += [
    # path("users/", views.UserList.as_view()),
    # path("api-auth/", include("rest_framework.urls")),
    path("login/", views.LoginView.as_view()),
    # path("users/<int:pk>/", views.UserDetail.as_view()),
]
