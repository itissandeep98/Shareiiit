# Generated by Django 3.1.7 on 2021-12-26 15:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messaging', '0006_auto_20211226_1340'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['timestamp', 'pk']},
        ),
    ]
