from django.contrib.auth import login, logout
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([AllowAny])
def register_user(request, format=None):
    data = request.data
    serializer = RegisterSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.create(
            username=data['username'],
            email=data['email'],
            password=data['password']
        )
    if user:
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response('Invalid Data.', status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([AllowAny])
def login_user(request, format=None):
    data = request.data
    serializer = LoginSerializer(data=data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    try:
        login(request, user)
        return Response(status=status.HTTP_202_ACCEPTED)
    except Exception:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def logout_user(request, format=None):
    logout(request)
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([AllowAny])
def sports_list(request, format=None):
    sports = Sport.objects.all().order_by('name')
    serializer = SportSerializer(sports, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([AllowAny])
def check_user(request, format=None):
    try:
        user = User.objects.get(id=request.user.id)
        auth = user.is_authenticated
        return Response({'auth': auth}, status=status.HTTP_200_OK)
    except Exception:
        return Response({'auth': False}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def participant_details(request, format=None):
    participant = Participant.objects.get(user_id=request.user.id)
    if participant:
        serializer = ParticipantSerializer(participant)
        data = serializer.data
        name = participant.user.username
        email = participant.user.email
        data['user'] = name
        data['email'] = email
        sports = participant.sport.all()
        names = []
        for s in sports:
            names.append(s.name)
        data['sport'] = names
        return Response(data, status=status.HTTP_200_OK)
    return Response('Participant Not Found.', status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def sport_details(request, name, format=None):
    try:
        sport = Sport.objects.get(name=name)
        participant = Participant.objects.get(user_id=request.user.id)
        if sport:
            serializer = SportSerializer(sport)
            data = serializer.data
            data['participants'] = len(sport.participant.all())
            data['participates'] = len(participant.sport.all())
            return Response(data, status=status.HTTP_200_OK)
    except Exception:
        return Response(
            'Sport Not Found.',
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def create_participant(request, format=None):
    data = request.data
    data['user'] = request.user.id
    serializer = ParticipantSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)
    return Response('Invalid Data.', status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def participate(request, format=None):
    participant = Participant.objects.get(user_id=request.user.id)
    name = request.data['name']
    sport = Sport.objects.get(name=name)
    participant.sport.add(sport)
    return Response('Participated Successfully.', status=status.HTTP_200_OK)


"""
{
    "username": "basel",
    "email": "www.example@gmail.com",
    "password": "basel.qalamun"
}
{
    "username": "belal",
    "email": "belal.armor@gmail.com",
    "password": "belal12345"
}
"""
