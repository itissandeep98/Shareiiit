from django.db.models.signals import post_save
from django.dispatch import receiver
from messaging.models import Message

# from rest_framework.authtoken.models import Token

from .models import Notification, Post


@receiver(post_save, sender=Message)
def create_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(message=instance)