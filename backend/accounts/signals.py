from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

# from rest_framework.authtoken.models import Token

from .models import Profile

User = get_user_model()


# @receiver(post_save, sender=User)
# def create_token(sender, instance, created, **kwargs):
#     if created:
#         print("creating token")
#         Token.objects.create(user=instance)


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
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
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    """
    This function will save the the profile for the user.
    Arguments:
        sender {int} -- Sender is the user for whom a particular account was created.
        instance {int} -- Instance of the user.
    """
    instance.profile.save()