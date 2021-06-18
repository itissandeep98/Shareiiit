from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

# from rest_framework.authtoken.models import Token

from .models import VoteCountLog, Post

User = get_user_model()


@receiver(post_save, sender=Post)
def create_count_log(sender, instance, created, **kwargs):
    """
    This is function for creating user profiles for all the users.
    This function automatically creates an entry in the Profile model.
    Profile model is an extention to the User model. It saves user's profile picture etc.
    To update profile table when a user is created using Django Admin

    Arguments:
        sender {[int]} -- Sender is the user
        instance {[int]} -- Instance of the user
        created {[boolean]} -- Created is the status of the user being created or not.

    Returns:
    nothing: returns nothing from this function.
    """
    if created:
        VoteCountLog.objects.create(post=instance)