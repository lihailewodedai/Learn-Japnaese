# Generated by Django 4.0.3 on 2022-10-21 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learnJapApp', '0003_alter_bunpo_examples'),
    ]

    operations = [
        migrations.AddField(
            model_name='bunpo',
            name='connection',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
