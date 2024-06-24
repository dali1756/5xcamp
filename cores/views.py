from django.shortcuts import render
from .models import Bank

def index(request):
    banks = Bank.objects.filter()
    return render(request, "index.html", {"banks":banks})