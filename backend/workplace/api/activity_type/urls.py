# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.routers import DefaultRouter

from workplace.api.activity_type.views import *

router = DefaultRouter()
router.register(r'activity-type', ActivityTypeViewSet)
urlpatterns = router.urls
