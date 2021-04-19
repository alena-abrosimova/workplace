from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include
from django.views.generic import TemplateView
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Workplace API')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^swagger/', schema_view),
    url(r'^workplace/', include('workplace.urls')),
    url(r'^.*$', TemplateView.as_view(template_name="index.html"))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG is True:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.ASSETS_URL, document_root=settings.ASSETS_ROOT)
