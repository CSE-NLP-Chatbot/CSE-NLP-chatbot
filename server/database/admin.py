from django.contrib import admin

# Register your models here.
from .models import ChatHistory,Feedback,UpdateTable


admin.site.register(ChatHistory)
admin.site.register(Feedback)
admin.site.register(UpdateTable)
