# Generated by Django 4.1.2 on 2022-10-22 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learnJapApp', '0011_alter_bunpo_questions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bunpoquestion',
            name='questionType',
            field=models.CharField(choices=[('Multiple Choice', 'MULTIPLE CHOICE'), ('Link', 'Link')], default='None', max_length=255),
        ),
    ]
