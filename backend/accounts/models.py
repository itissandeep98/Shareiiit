# from django.db import models
# from django.contrib.auth.models import User

# # Create your models here.

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    username_osa = models.CharField(max_length=150, unique=True)
    osa_token = models.CharField(max_length=300, unique=True)


class Profile(models.Model):
    # ROLE_CHOICES = ("Student", "Faculty", "Staff", "Other")

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=7, default="Student")
    phone_number = models.CharField(max_length=13, blank=True, null=True)
    bio = models.CharField(max_length=1024, blank=True, null=True)
    linkedin_url = models.URLField(max_length=127, blank=True, null=True)
    telegram_url = models.URLField(max_length=127, blank=True, null=True)
