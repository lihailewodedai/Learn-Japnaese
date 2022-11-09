from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),

    # API Routes
    path("Bunpo/<int:level>", views.fetchGrammar, name="fetch bunpo"),
    path("questions/<str:page>/<int:level>", views.fetchQuestion, name="fetch question")
]