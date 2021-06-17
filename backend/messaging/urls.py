from django.urls import path

from messaging import views

urlpatterns = [
    path("messages/", views.MessageView.as_view()),
    path("conversations/", views.ConversationView.as_view()),
]