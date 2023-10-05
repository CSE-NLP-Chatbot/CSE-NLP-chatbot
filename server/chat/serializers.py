# What should be sent.

from rest_framework import serializers
from database.models import ChatHistory,Feedback

class ChatTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatHistory
        fields = ( 
                  'conversation_title',                 
                  )

class ChatConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatHistory
        fields =( 'user_id',
                    'chat_history_id',
                    'date',
                    'conversation_title',
                    'question',
                    'answer'
                    )
        
class ChatRealTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatHistory
        fields = ( 'user',
                    'chat_history_id',
                    'date',
                    'conversation_title',
                    'question',
                    'answer'
                    )
        
class UserFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ( 'user',
                    'feedback_id',
                    'feedback_type',
                    'feedback_details'
                    
                    )
        
# class ChatConversationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ChatHistory
#         fields =( 'user_ID',
#                     'chat_history_id',
#                     'date',
#                     'conversation_title',
#                     'question',
#                     'answer'
#                     )