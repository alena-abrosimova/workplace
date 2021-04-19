# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db.models import Q
from django_filters.rest_framework import FilterSet, CharFilter

from workplace.models import Direction


class DirectionFilterSet(FilterSet):
    projects = CharFilter(method='filter_projects')

    @staticmethod
    def filter_projects(qs, name, value):
        return qs.filter(Q(project=value) | Q(project=None))

    class Meta:
        model = Direction
        exclude = ()
