# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

from workplace.common.serializers import BaseRelatedSerializer
from workplace.models import Report


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        exclude = ()


class ReportRelatedSerializer(BaseRelatedSerializer):
    class Meta:
        model_class = Report
        model_serializer_class = ReportSerializer
