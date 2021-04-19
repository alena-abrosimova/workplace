# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.routers import DefaultRouter

from workplace.api.activity_timer_settings.views import *

router = DefaultRouter()
router.register(r'activity-timer-settings', ActivityTimerSettingsViewSet)
urlpatterns = router.urls
