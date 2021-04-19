# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db.models import Q
from django_filters.rest_framework import FilterSet, CharFilter

from workplace.models import ActivityType


class ActivityTypeFilterSet(FilterSet):
    projects = CharFilter(method='filter_projects')
    directions = CharFilter(method='filter_directions')

    @staticmethod
    def filter_projects(qs, name, value):
        return qs.filter(Q(direction__project=value) | Q(direction__project=None))

    @staticmethod
    def filter_directions(qs, name, value):
        return qs.filter(Q(direction=value) | Q(direction=None))

    class Meta:
        model = ActivityType
        exclude = ()
