import sys
from django.utils.timezone import now

try:
    from django.db import models
except Exception:
    print("There was an error loading django modules. Do you have django installed?")
    sys.exit()

from django.conf import settings
import uuid


class ChatHistory(models.Model):
    chat_history_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    date = models.DateTimeField(auto_now_add=True)
    conversation_title = models.CharField(max_length=255)
    question = models.TextField()
    answer = models.TextField()

    def __str__(self):
        return self.conversation_title


class Feedback(models.Model):
    ACCURACY = "Accuracy"
    PERFORMANCE = "Performance"
    FEEDBACK_TYPE_CHOICES = [
        (ACCURACY, "Accuracy"),
        (PERFORMANCE, "Performance"),
    ]
    feedback_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    feedback_details = models.TextField()
    feedback_type = models.CharField(
        max_length=20,
        choices=FEEDBACK_TYPE_CHOICES,
        # default=ACCURACY,  # You can set a default value if needed
    )

    def __str__(self):
        return self.feedback_details


class UpdateTable(models.Model):
    PENDING = "Pending"
    COMPLETED = "Completed"
    UPDATE_STATUS_CHOICES = [
        (PENDING, "Pending"),
        (COMPLETED, "Completed"),
    ]

    update_id = models.AutoField(primary_key=True)
    update_information = models.TextField()
    update_status = models.CharField(
        max_length=20,
        choices=UPDATE_STATUS_CHOICES,
        default=PENDING,
    )
    feedback = models.OneToOneField(
        Feedback,
        on_delete=models.SET_NULL,  # Set to SET_NULL to allow updates not associated with feedback
        null=True,  # Allows for NULL values in the foreign key
        blank=True,  # Allows for an empty value in forms
    )

    def __str__(self):
        return self.update_information


