# Generated by Django 3.1.7 on 2021-12-12 15:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0009_skilllist_frequency'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='skilllist',
            name='type',
        ),
    ]