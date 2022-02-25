from django.urls import path, include

from . import views

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("users", views.UserViewSet, basename="users")
router.register("following", views.UserFollowingViewSet, basename="following")
urlpatterns = router.urls


urlpatterns += [
    # path("users/", views.UserList.as_view()),
    # path("api-auth/", include("rest_framework.urls")),
    path(r"osadetails/", views.OSADetailsView.as_view()),
    path(r"profile/", views.ProfileView.as_view()),
    path(r"login/", views.LoginView.as_view()),
    path(r"logout/", views.LogoutView.as_view())
    # path("users/<int:pk>/", views.UserDetail.as_view()),
]
