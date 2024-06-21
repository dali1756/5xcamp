from django.db import models

class Bank(models.Model):
    head_office_code = models.CharField(max_length=255)
    organization_code = models.CharField(max_length=255)
    institution_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    principal = models.CharField(max_length=50)
    change_date = models.CharField(max_length=20, null=True, blank=True)
    url = models.CharField(max_length=255, null=True, blank=True)
    announcement_date = models.CharField(max_length=20, null=True, blank=True)
    
    def __str__(self):
        return f"{self.institution_name} - {self.organization_code}"