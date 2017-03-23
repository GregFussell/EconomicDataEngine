from __future__ import unicode_literals

from django.db import models

# Create your models here.

class world(models.Model):
	name = models.CharField(primary_key = True, max_length = 25)
	continent = models.CharField(max_length = 25)
	area = models.IntegerField(primary_key = False)
	population = models.IntegerField(primary_key = False)
	gdp = models.IntegerField(primary_key = False)
	class Meta:
		db_table = "world"
