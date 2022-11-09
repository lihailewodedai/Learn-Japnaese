from random import choices
from django.db import models
from django.core.exceptions import ValidationError
import re
from django.core import serializers
from django.forms.models import model_to_dict


# Validator:
def exmapleValidator(value):
    regex = r"^(\d.*?。)+$"
    if value is not None:
        if not (re.match(regex, value)):
            raise ValidationError("this example is not valid")


# Create your models here.

questionChoices = (
    ("Multiple Choice", "Multiple choice"),
    ("Link", "Link")
)
class bunpoQuestion(models.Model):
    questionType = models.CharField(max_length=255, choices=questionChoices, default="None")
    level = models.IntegerField(null=True, blank=True)
    questionContent = models.CharField(max_length=255)
    questioningAbout = models.ForeignKey('bunpo', on_delete=models.CASCADE, related_name="question", null=True, blank=True)
    answer = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.questioningAbout}問題"
    
    def serialize(self):
        return {
            'question type': self.questionType,
            'question Content': self.questionContent,
            'questioning about': self.questioningAbout.content,
            'answer': self.answer,
            'id':self.id,
        }

class bunpo(models.Model):
    level = models.IntegerField(null=True, blank=True)
    content = models.CharField(max_length=255)
    explanation = models.CharField(max_length=255)
    examples = models.CharField(max_length=255, null=True, blank=True, validators=[exmapleValidator])
    connection = models.CharField(max_length=255, null=True, blank=True)
    questions = models.ManyToManyField(bunpoQuestion, blank=True, related_name="bunpo")

    def __str__(self):
        return f"{self.content}"

    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "explanation": self.explanation,
            "examples": self.examples,
            "level": self.level,
            "connection": self.connection,
        }