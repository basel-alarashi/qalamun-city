from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status


class RegisterTest(APITestCase):
    def test_register_user(self):
        data = {
            'username': 'Muhsen',
            'email': 'muhsen.example@gmail.com',
            'password': 'mumum1234555'
        }
        res = self.client.post(reverse('register'), data=data)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)


class ParticipantTest(APITestCase):
    def test_create_participant(self):
        data = {
            "phone": "00963968888888",
            "length": 180,
            "weight": 90,
            "sexuality": "male",
            "sick": False,
        }
        res = self.client.post(reverse('create'), data=data)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class SportsListTest(APITestCase):
    def test_sports_list(self):
        res = self.client.get(reverse('home'), format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
