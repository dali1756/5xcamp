import csv
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from cores.models import Bank, Branch

def import_data():
    with open("bank.csv", newline="", encoding="utf-8-sig") as csvfile:
        reader = csv.DictReader(csvfile)
        headers = reader.fieldnames
        print(headers)
        for row in reader:
            institution_name = row["機構名稱"].replace("股份有限公司", "")
            bank, created = Bank.objects.get_or_create(
                code=row["總機構代號"],
                defaults={"name": institution_name}
            )
            Branch.objects.get_or_create(
                bank=bank,
                branch_code=row["機構代號"],
                branch_name=row["機構名稱"].replace("股份有限公司", ""),
                defaults={
                    "address": row["地址"],
                    "phone": row["電話"],
                    "principal": row["負責人"],
                    "change_date": row["異動日期"]
                }
            )
if __name__ == "__main__":
    import_data()