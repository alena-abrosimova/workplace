# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_filters.rest_framework import FilterSet

from workplace.models import ActivityTimer


class ActivityTimerFilterSet(FilterSet):
    class Meta:
        model = ActivityTimer
        fields = ('user', 'state')
