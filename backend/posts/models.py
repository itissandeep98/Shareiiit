from django.db import models

# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=30, blank=False)

    def __str__(self):
        return self.name


class SkillType(models.Model):
    name = models.CharField(max_length=100, blank=False)

    def __str__(self):
        return self.name


class SkillList(models.Model):
    name = models.CharField(max_length=100, blank=False)
    type = models.ForeignKey(
        SkillType, related_name="type", on_delete=models.CASCADE
    )

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

    category = models.ForeignKey(
        Category, related_name="category", on_delete=models.CASCADE, null=True
    )

    def __str__(self):
        return self.title


class Choice(models.Model):
    name = models.CharField(max_length=30, blank=False)

    def __str__(self):
        return self.name


class Vote(models.Model):
    choice = models.ForeignKey(
        Choice, related_name="votes", on_delete=models.CASCADE
    )
    post = models.ForeignKey(
        Post, related_name="votes", on_delete=models.CASCADE
    )
    voted_by = models.ForeignKey(
        User, related_name="votes", on_delete=models.CASCADE
    )

    class Meta:
        unique_together = ("voted_by", "post", "choice")

    def __str__(self):
        return f"Voted by {self.voted_by.first_name} -- {self.choice} -- {self.post.title}"


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
