# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets

from workplace.api.role.filters import RoleFilterSet
from workplace.api.role.serializers import RoleSerializer
from workplace.models import Role


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    filter_class = RoleFilterSet
