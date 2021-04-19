# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_filters.rest_framework import FilterSet, DateFilter, DateTimeFilter

from workplace.models import Report


class ReportFilterSet(FilterSet):
    created_from = DateTimeFilter(field_name='created__date', lookup_expr='gte')
    created_to = DateTimeFilter(field_name='created__date', lookup_expr='lte')
    started_from = DateFilter(field_name='started', lookup_expr='gte')
    started_to = DateFilter(field_name='started', lookup_expr='lte')
    ended_from = DateFilter(field_name='ended', lookup_expr='gte')
    ended_to = DateFilter(field_name='ended', lookup_expr='lte')

    class Meta:
        model = Report
        exclude = ('link',)
