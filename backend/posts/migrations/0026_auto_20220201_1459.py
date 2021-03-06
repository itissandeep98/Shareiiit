# Generated by Django 3.1.7 on 2022-02-01 09:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('messaging', '0007_auto_20211226_2123'),
        ('posts', '0025_messagenotification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='messagenotification',
            name='message',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='messaging.message'),
        ),
        migrations.AlterField(
            model_name='messagenotification',
            name='notification',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='message_notification', to='posts.notification'),
        ),
    ]
