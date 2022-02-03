from django.db import models

# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.db.models.fields import IntegerField
from django.utils import timezone
from django.template.defaultfilters import pluralize

# from django.apps import apps

from model_utils import FieldTracker

User = get_user_model()
# Conversation = apps.get_model("messaging.conversation")


class Category(models.Model):
    name = models.CharField(max_length=30, blank=False)

    def __str__(self):
        return self.name


class SkillList(models.Model):
    label = models.CharField(max_length=100, blank=False, unique=True)
    # type = models.CharField(max_length=4, choices=TYPE_CHOICES, default="TECH")
    frequency = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.label

    class Meta:
        ordering = ["-frequency"]


class Post(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        User, related_name="posts", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=50, blank=True, null=True)
    description = models.CharField(max_length=200, blank=True, null=True)
    is_request = models.BooleanField(default=True)
    price = models.IntegerField(default=0)
    is_price_negotiable = models.BooleanField(default=False)
    status = models.CharField(max_length=100, default="active")
    image = models.ImageField(upload_to="posts/", null=True)
    image_url = models.TextField(
        blank=True, null=True
    )  # image_url became redundant after image field was added
    is_deleted = models.BooleanField(default=False)
    is_expired = models.BooleanField(default=False)

    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ["-vote_count_log__upvote_count", "-created_at"]

    def __str__(self):
        return self.title


class VoteCountLog(models.Model):
    post = models.OneToOneField(
        Post, related_name="vote_count_log", on_delete=models.CASCADE
    )
    upvote_count = models.PositiveIntegerField(default=0)
    tracker = FieldTracker(fields=["upvote_count"])


class VoteLog(models.Model):
    post = models.ForeignKey(
        Post, related_name="vote_log", on_delete=models.CASCADE
    )
    voted_by = models.ForeignKey(
        User, related_name="vote_log", on_delete=models.CASCADE
    )

    # auto_now_add is timestamp for creation, auto_now will also be updated every time the entry is updated.
    timestamp = models.DateTimeField(auto_now=True)

    saved_flag = models.BooleanField(default=False)
    upvoted_flag = models.BooleanField(default=False)
    dismiss_flag = models.BooleanField(default=False)


class Book(models.Model):
    post = models.OneToOneField(
        Post, related_name="book", on_delete=models.CASCADE
    )
    author = models.CharField(max_length=100, blank=True, null=True)


class Skill(models.Model):
    post = models.OneToOneField(Post, on_delete=models.CASCADE)
    label = models.CharField(max_length=100, blank=False, null=False)
    rating = models.IntegerField()

    def __str__(self):
        return f"{self.label} - {self.post.created_by.username}"


class Group(models.Model):
    post = models.OneToOneField(Post, on_delete=models.CASCADE)
    current_members = models.ManyToManyField(User)
    members_needed = models.IntegerField()
    # tracker = FieldTracker(fields=["current_members"])


class ElectronicItem(models.Model):
    post = models.OneToOneField(Post, on_delete=models.CASCADE)


class Other(models.Model):
    post = models.OneToOneField(Post, on_delete=models.CASCADE)


class Notification(models.Model):
    """
    A new notification is created for the receiver of updates to posts using a signal.
    """

    TYPE_CHOICES = (
        ("MSG", "message"),
        ("TAG", "mention"),
        ("VOTE", "upvote"),
        ("FLW", "follow"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    read = models.BooleanField(default=False)
    # text = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now, auto_now=False)
    type = models.CharField(choices=TYPE_CHOICES, max_length=5)

    class Meta:
        ordering = ["-timestamp"]

    @property
    def text(self):
        if self.type == "VOTE":
            upvote_count = self.post.vote_count_log.upvote_count

            if self.post.category.name == "skill":
                return f"Your skill has {upvote_count} endorsement{pluralize(upvote_count)}."

            return (
                f"Your post has {upvote_count} upvote{pluralize(upvote_count)}."
            )
        elif self.type == "TAG":
            return f"{self.post.created_by.name} tagged you as the member of a group."
        elif self.type == "MSG":
            return f"You have a new message from {self.message_notification.message.sender.name}."
        elif self.type == "FLW":
            return f"{self.post.created_by.name} added a new post."


class MessageNotification(models.Model):
    notification = models.OneToOneField(
        Notification,
        on_delete=models.CASCADE,
        related_name="message_notification",
    )
    message = models.OneToOneField(
        "messaging.Message", on_delete=models.CASCADE
    )
