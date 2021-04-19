# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.routers import DefaultRouter

from workplace.api.role.views import *


router = DefaultRouter()
router.register(r'role', RoleViewSet)
urlpatterns = router.urls
