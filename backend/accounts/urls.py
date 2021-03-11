from django.urls import path, include

# from .api import RegisterAPI, LoginAPI, UserAPI
from . import views


urlpatterns = [
    path("users/", views.UserCreate.as_view()),
    path("users/list", views.UserList.as_view()),
    path("login/", views.LoginView.as_view())
    # path("users/<int:pk>/", views.UserDetail.as_view()),
]
