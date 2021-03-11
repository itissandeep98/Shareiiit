from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=30, blank=False)

    def __str__(self):
        return self.name


class Post(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE)
    title = models.CharField(max_length=50, blank=True, null=True)
    body = models.CharField(max_length=200, blank=True, null=True)
    category = models.ForeignKey(
        Category, related_name="categories", on_delete=models.CASCADE, null=True
    )

    def __str__(self):
        return self.body


class Choice(models.Model):
    name = models.CharField(max_length=30, blank=False)

    def __str__(self):
        return self.name


class Vote(models.Model):
    choice = models.ForeignKey(Choice, related_name="votes", on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name="votes", on_delete=models.CASCADE)
    voted_by = models.ForeignKey(User, related_name="votes", on_delete=models.CASCADE)


class Book(models.Model):
    post = models.OneToOneField(Post, related_name="books", on_delete=models.CASCADE)
    author = models.CharField(max_length=100)