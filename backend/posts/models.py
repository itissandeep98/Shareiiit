from django.db import models

# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.db.models.fields import IntegerField

User = get_user_model()

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=30, blank=False)

    def __str__(self):
        return self.name


# class SkillType(models.Model):
#     name = models.CharField(max_length=100, blank=False)

#     def __str__(self):
#         return self.name


class SkillList(models.Model):
    TYPE_CHOICES = [
        ("TECH", "Technical"),
    ]

    name = models.CharField(max_length=100, blank=False)
    type = models.CharField(max_length=4, choices=TYPE_CHOICES, default="TECH")

    def __str__(self):
        return self.name


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
    # image = models.ImageField(upload_to="posts/", default="posts/default.jpg")
    image_url = models.TextField(blank=True, null=True)
    is_deleted = models.BooleanField(default=False)
    is_expired = models.BooleanField(default=False)

    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ["-vote_count_log__upvote_count", "-created_at"]

    def __str__(self):
        return self.title


# class Choice(models.Model):
#     name = models.CharField(max_length=30, blank=False)

#     def __str__(self):
#         return self.name


class VoteCountLog(models.Model):
    post = models.OneToOneField(
        Post, related_name="vote_count_log", on_delete=models.CASCADE
    )
    upvote_count = models.PositiveIntegerField(default=0)


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
    name = models.CharField(max_length=100, blank=False, null=False)
    rating = models.IntegerField()


class Group(models.Model):
    post = models.OneToOneField(Post, on_delete=models.CASCADE)
    members_needed = models.IntegerField()


class ElectronicItem(models.Model):
    post = models.OneToOneField(Post, on_delete=models.CASCADE)


class Other(models.Model):
    post = models.OneToOneField(Post, on_delete=models.CASCADE)
