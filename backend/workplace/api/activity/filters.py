# -*- coding: utf-8 -*-
from django_filters.rest_framework import FilterSet

from workplace.models import Activity


class ActivityFilterSet(FilterSet):
    class Meta:
        model = Activity
        exclude = ()
