# Generated by Django 5.0.6 on 2024-06-21 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bank',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('head_office_code', models.CharField(max_length=255)),
                ('organization_code', models.CharField(max_length=255)),
                ('institution_name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('phone', models.CharField(max_length=20)),
                ('principal', models.CharField(max_length=50)),
                ('change_date', models.CharField(blank=True, max_length=20, null=True)),
                ('url', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('announcement_date', models.CharField(blank=True, max_length=20, null=True)),
            ],
        ),
    ]
