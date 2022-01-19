from django.db import models
from django.contrib.auth import get_user_model
from posts.models import Post

# Create your models here.

User = get_user_model()


class Conversation(models.Model):
    user2 = models.ForeignKey(
        User, related_name="user2", on_delete=models.CASCADE
    )
    post = models.ForeignKey(
        Post, related_name="post", on_delete=models.CASCADE
    )


class Message(models.Model):
    conversation = models.ForeignKey(
        Conversation, blank=False, null=True, on_delete=models.CASCADE
    )
    sender = models.ForeignKey(
        User, related_name="sender", on_delete=models.CASCADE
    )

    receiver = models.ForeignKey(
        User, related_name="receiver", on_delete=models.CASCADE
    )
    text = models.CharField(max_length=1024, blank=False, null=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_seen = models.BooleanField(default=False)

    class Meta:
        ordering = ["timestamp", "pk"]


class Notification(models.Model):
    """
    A new notification is created for the receiver of a new message using a signal.
    """

    message = models.OneToOneField(Message, on_delete=models.CASCADE)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-message__timestamp"]
