# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

from workplace.common.serializers import BaseRelatedSerializer
from workplace.models import Role


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        exclude = ()


class RoleRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = Role
        model_serializer_class = RoleSerializer
