# Generated by Django 3.1.7 on 2022-01-28 12:28

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('posts', '0015_auto_20220116_1519'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='current_members',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
