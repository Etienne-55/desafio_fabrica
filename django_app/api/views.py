from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def health(request):
    return Response({'status': 'connected', 'message': 'Django backend is running'})

@api_view(['POST'])
def login(request):
    email = request.data.get('email', '')
    password = request.data.get('password', '')

    if email == settings.ADMIN_EMAIL and password == settings.ADMIN_PASSWORD:
        return Response({
            'success': True,
            'message': 'Login successful',
            'user': {'email': email}
        })

    return Response(
        {'success': False, 'message': 'Invalid credentials'},
        status=status.HTTP_401_UNAUTHORIZED
    )
