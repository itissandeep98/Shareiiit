from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.template.defaultfilters import pluralize


# from rest_framework.authtoken.models import Token

from .models import Group, MessageNotification, VoteCountLog, Post, Notification
from messaging.models import Message

from django.utils import timezone

User = get_user_model()


@receiver(post_save, sender=Message)
def create_message_notification(sender, instance, created, **kwargs):
    if created:
        try:
            notification = Notification.objects.get(
                post=instance.conversation.post,
                user=instance.receiver,
                type="MSG",
                message_notification__message__conversation=instance.conversation,
            )

            notification.timestamp = timezone.now()
            notification.read = False
            notification.message_notification.message = instance
            notification.save()
        except Notification.DoesNotExist:
            notification = Notification.objects.create(
                post=instance.conversation.post,
                user=instance.receiver,
                type="MSG",
            )

            message_notification = MessageNotification.objects.create(
                notification=notification, message=instance
            )


@receiver(post_save, sender=VoteCountLog)
def create_update_upvote_notification(sender, instance, created, **kwargs):
    if not created:
        if instance.tracker.has_changed("upvote_count"):
            try:
                notification = Notification.objects.get(
                    post=instance.post,
                    user=instance.post.created_by,
                    type="VOTE",
                )
            except:
                notification = Notification(
                    post=instance.post,
                    user=instance.post.created_by,
                    type="VOTE",
                )

            if instance.upvote_count == 0:
                notification.delete()
            else:
                # notification.text = f"Your post has {instance.upvote_count} upvote{pluralize(instance.upvote_count)}."
                notification.read = False
                notification.timestamp = timezone.now()
                notification.save()


@receiver(m2m_changed, sender=Group.current_members.through)
def create_group_member_notification(
    sender, instance, action, reverse, model, pk_set, using, **kwargs
):
    if action == "post_add":
        for pk in pk_set:
            if pk == instance.post.created_by.pk:
                continue

            notification = Notification(
                post=instance.post, user_id=pk, type="TAG"
            )
            # notification.text = f"You have been mentioned as the member of a group by {instance.post.created_by.username}."
            notification.save()

    if action == "post_remove":
        for pk in pk_set:
            try:
                notification = Notification.objects.get(
                    post=instance.post, user_id=pk, type="TAG"
                )
                notification.delete()
            except Notification.DoesNotExist:
                pass


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


@receiver(post_save, sender=Post)
def create_follower_notification(sender, instance, created, **kwargs):
    if created and instance.category.name != "skill":
        for relation in instance.created_by.following.all():
            Notification.objects.create(
                post=instance, user=relation.following_user, type="FLW"
            )
