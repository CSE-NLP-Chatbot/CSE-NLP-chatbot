# Generated by Django 4.2.5 on 2023-09-28 11:30

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0005_customuser_username"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="username",
            field=models.CharField(max_length=50, null=True),
        ),
    ]
