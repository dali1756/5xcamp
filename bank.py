import csv
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from cores.models import Bank

def import_data():
    with open("bank.csv", newline="", encoding="utf-8-sig") as csvfile:
        reader = csv.DictReader(csvfile)
        headers = reader.fieldnames
        print(headers)
        for row in reader:
            Bank.objects.create(
                head_office_code=row["總機構代號"],
                organization_code=row["機構代號"],
                institution_name=row["機構名稱"],
                address=row["地址"],
                phone=row["電話"],
                principal=row["負責人"],
                change_date=row["異動日期"],
                url=row["金融機構網址"],
                announcement_date=row["公告日期"],
            )
if __name__ == "__main__":
    import_data()