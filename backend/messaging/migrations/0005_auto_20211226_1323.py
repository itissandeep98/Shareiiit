# Generated by Django 3.1.7 on 2021-12-26 07:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messaging', '0004_auto_20211203_2137'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['timestamp', 'pk']},
        ),
    ]
