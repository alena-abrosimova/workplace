# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_filters.rest_framework import FilterSet

from workplace.models import Role


class RoleFilterSet(FilterSet):
    class Meta:
        model = Role
        exclude = ()
