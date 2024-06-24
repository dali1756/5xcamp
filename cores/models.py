from django.db import models

class Bank(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name

class Branch(models.Model):
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE, related_name='branches')
    branch_code = models.CharField(max_length=255)
    branch_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    principal = models.CharField(max_length=50, null=True, blank=True)
    change_date = models.CharField(max_length=20, null=True, blank=True)
    
    def __str__(self):
        return f"{self.branch_name} - {self.branch_code}"
