# Generated by Django 4.2.5 on 2023-09-23 08:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0004_customuser_profile_pic"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="username",
            field=models.CharField(max_length=50, null=True, unique=True),
        ),
    ]
