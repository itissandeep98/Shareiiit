# Generated by Django 3.1.7 on 2022-01-31 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0020_auto_20220131_2003'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='type',
            field=models.CharField(choices=[('MSG', 'message'), ('TAG', 'mention'), ('VOTE', 'upvote')], default='VOTE', max_length=5),
            preserve_default=False,
        ),
    ]