# Generated by Django 3.1.7 on 2021-04-13 11:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0009_message'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='post',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='book', to='posts.post'),
        ),
    ]