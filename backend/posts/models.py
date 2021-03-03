from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Post(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=100, blank=False)
    owner = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE)

    def __str__(self):
        return self.body
