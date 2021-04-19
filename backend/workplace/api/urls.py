# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url, include
from rest_framework.authtoken import views

urlpatterns = [
    url(r'^login/', views.obtain_auth_token),
    url(r'^', include(('workplace.api.activity.urls', 'workplace'), namespace='activity')),
    url(r'^', include(('workplace.api.activity_timer.urls', 'workplace'), namespace='activity_timer')),
    url(r'^', include(('workplace.api.activity_timer_settings.urls', 'workplace'),
                      namespace='activity_timer_settings')),
    url(r'^', include(('workplace.api.activity_type.urls', 'workplace'), namespace='activity_type')),
    url(r'^', include(('workplace.api.direction.urls', 'workplace'), namespace='direction')),
    url(r'^', include(('workplace.api.project.urls', 'workplace'), namespace='project')),
    url(r'^', include(('workplace.api.report.urls', 'workplace'), namespace='report')),
    url(r'^', include(('workplace.api.role.urls', 'workplace'), namespace='role')),
    url(r'^', include(('workplace.api.user.urls', 'workplace'), namespace='user')),
]
