from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    html = open('..\..\EconomicDataEngine\index.html')
    return HttpResponse("html")
