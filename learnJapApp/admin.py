from tokenize import String
from django.contrib import admin
from .models import bunpo, bunpoQuestion
from django import forms
import re
from django.core.exceptions import ValidationError
from django.forms import TextInput, Textarea
from django.db import models


# Register your models here.

class bunpoForm(forms.ModelForm):
    class Meta:
        model = bunpo
        fields = ['level', 'content', 'explanation', 'examples', 'connection', 'questions']

    def clean(self):
        example = self.cleaned_data.get('examples')
        regex = r"^(\d.*?。)+$"
        x = example.split("|")
        valid = True
        for subStr in x:
            if not (re.match(regex, subStr)):
                valid = False
                break
        if valid == False:
            raise ValidationError("input unvalid")
        return self.cleaned_data

class bunpoAdmin(admin.ModelAdmin):
    form = bunpoForm
    list_display = ('id', 'content')
    filter_horizontal = ("questions",)

class bunpoQueAdmin(admin.ModelAdmin):
    list_display = ('id', 'questioningAbout')
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size':'150'})},
    }

admin.site.register(bunpoQuestion, bunpoQueAdmin)
admin.site.register(bunpo, bunpoAdmin)


        
