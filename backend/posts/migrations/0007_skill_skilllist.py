# Generated by Django 3.1.7 on 2021-04-12 09:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_auto_20210410_1728'),
    ]

    operations = [
        migrations.CreateModel(
            name='SkillList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.IntegerField()),
                ('post', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='posts.post')),
                ('skill', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='posts.skilllist')),
            ],
        ),
    ]
