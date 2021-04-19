# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_filters.rest_framework import FilterSet

from workplace.models import Project


class ProjectFilterSet(FilterSet):
    class Meta:
        model = Project
        exclude = ()
