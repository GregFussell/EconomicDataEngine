from django.shortcuts import render

# Create your views here.

from django.template import Context, loader
from django.http import HttpResponse
from newapp.models import world
def index(request):
      world_list = world.objects.all().order_by('name')
      tmpl = loader.get_template("index.html")
      cont = Context({'world': world_list})
      return HttpResponse(tmpl.render(cont))