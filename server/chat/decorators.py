import jwt
import re
from backend import settings
from django.http import JsonResponse
from requests import Response
from users.models import CustomUser

def require_user_permission(view_func):
    def wrapped(request, *args, **kwargs):
        if request.headers['Authorization'] :
            token = request.headers['Authorization']
        else:
            return JsonResponse({"error": "You are not authorized to access this resource"}, status=401)

        # Return email from payload as a HTTP response
        if token:
            try:
                payload = jwt.decode(token, settings.SECRET_KEY_JWT, algorithms=['HS256'])
                user = CustomUser.objects.filter(email=payload['email']).first()
                if user and user.user_type == 'undergraduate' or user.user_type == 'postgraduate':
                    return view_func(request, *args, **kwargs)
            except jwt.exceptions.DecodeError:
                return JsonResponse({"error": "You are not authorized to access this resource"}, status=401)
            except jwt.ExpiredSignatureError:
                return JsonResponse({"error": "You are not authorized to access this resource"}, status=401)
        
        return JsonResponse({"error": "You are not authorized to access this resource"}, status=401)

    return wrapped
