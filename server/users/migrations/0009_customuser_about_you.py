# Generated by Django 4.2.5 on 2023-09-30 21:17

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0008_alter_customuser_login_times"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="about_you",
            field=models.CharField(max_length=500, null=True),
        ),
    ]
