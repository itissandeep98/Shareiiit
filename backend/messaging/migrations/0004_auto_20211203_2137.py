# Generated by Django 3.1.7 on 2021-12-03 16:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messaging', '0003_auto_20211203_2136'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='notification',
            options={'ordering': ['-message__timestamp']},
        ),
        migrations.RemoveField(
            model_name='notification',
            name='timestamp',
        ),
    ]
