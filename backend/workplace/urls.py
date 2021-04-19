# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url, include

urlpatterns = [
    url(r'^api/', include(('workplace.api.urls', 'workplace'), namespace='api')),
]
