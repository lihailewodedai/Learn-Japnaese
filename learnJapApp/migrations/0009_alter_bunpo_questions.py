# Generated by Django 4.1.2 on 2022-10-22 11:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learnJapApp', '0008_remove_bunpoquestion_questionabout_bunpo_questions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bunpo',
            name='questions',
            field=models.ManyToManyField(related_name='bunpo', to='learnJapApp.bunpoquestion'),
        ),
    ]
