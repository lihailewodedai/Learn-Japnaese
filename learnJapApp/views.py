from lib2to3.pgen2 import grammar
from django.shortcuts import render
from django.http import HttpResponse
from .models import bunpo
from .models import bunpoQuestion
from django.core import serializers
from django.http import JsonResponse


# Create your views here.

def index(request):
    grammars = bunpo.objects.filter(level=2)
    return render(request, "learnJap/index.html", {
        "Bunpo": grammars[0].serialize()
    })

def fetchGrammar(request,  level):
    if level != 0:
        grammars = bunpo.objects.filter(level=level)
    else:
        grammars = bunpo.objects.all()
    return JsonResponse([grammar.serialize() for grammar in grammars], safe=False)

def fetchQuestion(request, page, level):
    if page[0] in "Bb":
        if int(level) != 0:
            questions = bunpoQuestion.objects.filter(level=level)
    return JsonResponse([question.serialize() for question in questions], safe=False)