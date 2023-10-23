import jwt
import re
from backend import settings
from django.http import JsonResponse
from requests import Response
from users.models import CustomUser

def require_admin_permission(view_func):
    def wrapped(request, *args, **kwargs):
        pattern =r"b'(.*)'"
        if request.COOKIES.get('jwt'):
            token = re.search(pattern,request.COOKIES.get('jwt'))
        else:
            return JsonResponse({"error": "You are not authorized to access this resource"}, status=401)

        # Return email from payload as a HTTP response
        if token:
            try:
                token = token.group(1)
                payload = jwt.decode(token, settings.SECRET_KEY_JWT, algorithms=['HS256'])
                user = CustomUser.objects.filter(email=payload['email']).first()
                if user and user.user_type == 'admin':
                    return view_func(request, *args, **kwargs)
            except jwt.exceptions.DecodeError:
                return JsonResponse({"error": "You are not authorized to access this resource"}, status=401)
            except jwt.ExpiredSignatureError:
                return JsonResponse({"error": "You are not authorized to access this resource"}, status=401)
        
        return JsonResponse({"error": "You are not authorized to access this resource"}, status=401)

    return wrapped
