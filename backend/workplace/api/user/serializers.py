# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

from workplace.common.serializers import BaseRelatedSerializer
from workplace.models import User


class UserSerializer(serializers.ModelSerializer):
    firstName = serializers.CharField(source='first_name')
    lastName = serializers.CharField(source='last_name')
    middleName = serializers.CharField(source='middle_name', required=False, allow_null=True, allow_blank=True)
    lastLogin = serializers.CharField(source='last_login', required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = User
        exclude = ('password', 'date_joined', 'is_active', 'is_staff', 'user_permissions', 'groups')


class UserRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = User
        model_serializer_class = UserSerializer
