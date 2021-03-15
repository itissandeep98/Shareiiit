from django.urls import path, include

# from .api import RegisterAPI, LoginAPI, UserAPI
from . import views


urlpatterns = [
    path("users/", views.UserList.as_view()),
    path("api-auth/", include("rest_framework.urls")),
    # path("login/", views.LoginView.as_view())
    # path("users/<int:pk>/", views.UserDetail.as_view()),
]
