from django.db import models
from django.conf import settings

# Create your models here.

class Form(models.Model):
    name = models.CharField(max_length=255)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self): return self.name

class Field(models.Model):
    FIELD_TYPES = [('text','Text'),('number','Number'),('date','Date'),('password','Password'),('textarea','Textarea'),('checkbox','Checkbox')]#('select','Select')
    form = models.ForeignKey(Form, related_name='fields', on_delete=models.CASCADE)
    label = models.CharField(max_length=255)
    field_type = models.CharField(max_length=50, choices=FIELD_TYPES)
    required = models.BooleanField(default=False)
    options = models.JSONField(null=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
      ordering=['order']
    def __str__(self):
      return f"{self.form.name} - {self.label}"

class Employee(models.Model):
    form = models.ForeignKey(Form, related_name='employees', on_delete=models.CASCADE)
    data = models.JSONField(default=dict)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self): 
      return f"Employee #{self.pk} ({self.form.name})"