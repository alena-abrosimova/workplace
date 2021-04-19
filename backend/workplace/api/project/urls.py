# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.routers import DefaultRouter

from workplace.api.project.views import *


router = DefaultRouter()
router.register(r'project', ProjectViewSet)
urlpatterns = router.urls
