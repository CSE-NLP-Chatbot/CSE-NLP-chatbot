# Generated by Django 4.2.5 on 2023-09-29 13:25

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0007_customuser_login_times"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="login_times",
            field=models.IntegerField(default=0),
        ),
    ]
