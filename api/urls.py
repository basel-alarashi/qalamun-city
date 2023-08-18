from django.urls import path
from .views import *

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user),
    path('logout/', logout_user),
    path('', sports_list, name='home'),
    path('check/', check_user),
    path('my-details/', participant_details),
    path('sports/<str:name>/', sport_details),
    path('create-participant/', create_participant, name='create'),
    path('participate/', participate),
]
