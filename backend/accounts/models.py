# from django.db import models
# from django.contrib.auth.models import User

# # Create your models here.

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    username_osa = models.CharField(max_length=150, unique=True)

    @property
    def name(self):
        full_name = f"{self.first_name} {self.last_name}"

        if len(full_name) == 1:
            return self.username

        return full_name


class Profile(models.Model):
    # ROLE_CHOICES = ("Student", "Faculty", "Staff", "Other")

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=7, default="Student")
    phone_number = models.CharField(max_length=13, blank=True, null=True)
    bio = models.CharField(max_length=1024, blank=True, null=True)
    linkedin_url = models.URLField(max_length=127, blank=True, null=True)
    telegram_url = models.URLField(max_length=127, blank=True, null=True)
    image = models.ImageField(upload_to="accounts/", null=True)
    image_url = models.TextField(blank=True, null=True)


class UserFollowing(models.Model):
    user = models.ForeignKey(
        "User", related_name="following", on_delete=models.CASCADE
    )
    following_user = models.ForeignKey(
        "User", related_name="followers", on_delete=models.CASCADE
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["user__first_name", "user__last_name", "user__username"]
        unique_together = (
            "user",
            "following_user",
        )
