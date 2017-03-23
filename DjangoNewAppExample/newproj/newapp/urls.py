#from django.conf.urls.defaults import *
from django.conf.urls import include
from newapp.views import index
from django.conf.urls import url
urlpatterns = [
           url(r'^$', index),
           ]