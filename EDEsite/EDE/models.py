# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models

class Communities(models.Model):
    communityid = models.BigIntegerField(primary_key=True, blank=True, null=True)
    name = models.CharField(max_length=300, blank=True, null=True)
    belongsto = models.ForeignKey('States', models.DO_NOTHING, related_name='communities_belongsTo', db_column='belongsto', blank=True, null=True)
    year = models.ForeignKey('States', models.DO_NOTHING, related_name='communities_Year', primary_key=True, db_column='year', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'communities'

class Household(models.Model):
    serialno = models.CharField(primary_key=True, max_length=192)
    year = models.ForeignKey(Communities, models.DO_NOTHING, related_name="household_Year", primary_key=True, db_column='year')
    numberofmembers = models.BigIntegerField()
    propertyvalue = models.BigIntegerField(blank=True, null=True)
    iswithin = models.ForeignKey(Communities, models.DO_NOTHING, related_name='household_Iswithin', db_column='iswithin', blank=True, null=True)
    numberofchildren = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'household'
        unique_together = (('serialno', 'year'),)


class Income(models.Model):
    sporder = models.CharField(primary_key=True, max_length=60)
    serialno = models.CharField(primary_key=True, max_length=192)
    adjinc = models.FloatField()
    intp = models.FloatField(blank=True, null=True)
    oip = models.FloatField(blank=True, null=True)
    pap = models.FloatField(blank=True, null=True)
    retp = models.FloatField(blank=True, null=True)
    wagp = models.FloatField(blank=True, null=True)
    pincp = models.FloatField(blank=True, null=True)
    semp = models.FloatField(blank=True, null=True)
    povpip = models.FloatField(blank=True, null=True)
    year = models.FloatField(blank=True, null=True)
    ssp = models.FloatField(blank=True, null=True)
    ssip = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'income'
        unique_together = (('serialno', 'sporder'),)


class Industry(models.Model):
    industryid = models.CharField(primary_key=True, max_length=192)
    name = models.CharField(max_length=450)

    class Meta:
        managed = False
        db_table = 'industry'


class Person(models.Model):
    sporder = models.BigIntegerField(primary_key=True)
    year = models.BigIntegerField(primary_key=True)
    agep = models.BigIntegerField(blank=True, null=True)
    mig = models.BigIntegerField(blank=True, null=True)
    rac3p = models.CharField(max_length=90, blank=True, null=True)
    lanp = models.ForeignKey('Primarylanguage', models.DO_NOTHING, db_column='lanp', blank=True, null=True)
    naicsp = models.CharField(max_length=192, blank=True, null=True)
    serialno = models.CharField(primary_key=True, max_length=192)

    class Meta:
        managed = False
        db_table = 'person'
        unique_together = (('sporder', 'year', 'serialno'),)


class Primarylanguage(models.Model):
    languageid = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=300)

    class Meta:
        managed = False
        db_table = 'primarylanguage'


class Race(models.Model):
    racename = models.CharField(max_length=192)
    raceid = models.FloatField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'race'


class States(models.Model):
    stateid = models.BigIntegerField(primary_key=True)
    year = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=300)
    population = models.BigIntegerField()

    class Meta:
        managed = False
        db_table = 'states'
        unique_together = (('stateid', 'year'),)