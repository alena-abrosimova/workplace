# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response

from workplace.api.user.filters import UserFilterSet
from workplace.api.user.serializers import UserSerializer
from workplace.models import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_class = UserFilterSet
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    search_fields = ('last_name', 'first_name', 'middle_name')
    ordering_fields = ('last_name',)

    def perform_create(self, serializer):
        user = serializer.save()
        user.set_password(self.request.data.get('password', ''))
        user.save()

    def perform_update(self, serializer):
        user = serializer.save()

        password = self.request.data.get('password')
        # Даём возможность менять пароли только админу
        if password:
            user.set_password(password)
            user.save()

    @action(methods=['GET'], url_path='profile', detail=False)
    def get_user_profile(self, request):
        user = User.objects.filter(id=request.user.id).first()
        return JsonResponse(UserSerializer(user).data)

    @action(methods=['POST'], url_path='change-password', detail=False)
    def change_password(self, request):
        user = request.user
        old_password = request.data.get('oldPassword', '')
        new_password = request.data.get('newPassword', '')

        if user.check_password(old_password):
            user.set_password(new_password)
            user.save()
        else:
            return Response({'messages': ['Неверный пароль']}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        return JsonResponse({"ok": True})

    @action(methods=['POST'], url_path='upload-avatar', detail=True)
    def upload_avatar(self, request, pk):
        attachment = request.FILES.get('file')
        messages = []
        if not attachment:
            messages += ['Файл не задан']

        if messages:
            return Response(data={'messages': messages}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(pk=pk).first()
        if not user:
            return Response(data={'messages': ['Пользователь с заданным pk не найден в базе']},
                            status=status.HTTP_404_NOT_FOUND)

        user.avatar = attachment
        user.save()

        return JsonResponse({"avatar": user.avatar.url})
