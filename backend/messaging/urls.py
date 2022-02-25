from django.urls import path, include
from rest_framework.routers import DefaultRouter
from messaging import views

router = DefaultRouter()

# router.register(r"notifications", views.NotificationView, basename="skills")

urlpatterns = [
    path("", include(router.urls)),
    path("messages/", views.MessageView.as_view()),
    path("conversations/", views.ConversationView.as_view()),
]
