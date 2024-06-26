from django.shortcuts import render
from .models import Bank, Branch
from django.http import JsonResponse
import json

def index(request):
    banks = list(Bank.objects.all().values("name", "code"))
    banks_json = json.dumps(banks)
    return render(request, "index.html", {"banks_json": banks_json})

def get_branches(request, bank_code):
    branches = list(Branch.objects.filter(bank__code=bank_code).values("branch_code", "branch_name"))
    return JsonResponse(branches, safe=False)

def get_branch_detail(request, branch_code):
    branch = Branch.objects.get(branch_code=branch_code)
    branch_detail = {
        "bank_name": branch.bank.name,
        "bank_code": branch.bank.code,
        "branch_name": branch.branch_name,
        "branch_code": branch.branch_code,
        "address": branch.address,
        "phone": branch.phone,
    }
    return JsonResponse(branch_detail, safe=False)

def branch_page(request, bank_code, branch_code, branch_name):
    banks = list(Bank.objects.all().values("name", "code"))
    banks_json = json.dumps(banks)
    branch = Branch.objects.get(branch_code=branch_code)
    branch_detail = {
        "bank_name": branch.bank.name,
        "bank_code": branch.bank.code,
        "branch_name": branch.branch_name,
        "branch_code": branch.branch_code,
        "address": branch.address,
        "phone": branch.phone,
    }
    return render(request, "index.html", {"banks_json": banks_json, "branch_detail": json.dumps(branch_detail)})
