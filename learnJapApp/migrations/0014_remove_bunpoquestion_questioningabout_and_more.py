# Generated by Django 4.1.2 on 2022-10-22 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learnJapApp', '0013_remove_bunpoquestion_answertype_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bunpoquestion',
            name='questioningAbout',
        ),
        migrations.AddField(
            model_name='bunpoquestion',
            name='questioningAbout',
            field=models.ManyToManyField(blank=True, related_name='question', to='learnJapApp.bunpo'),
        ),
    ]