from collections import OrderedDict

from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers


class ChoicesField(serializers.Field):
    def __init__(self, choices, **kwargs):
        self._choices = choices
        super(ChoicesField, self).__init__(**kwargs)

    def to_representation(self, obj):
        return self._choices[obj]

    def to_internal_value(self, data):
        return getattr(self._choices, data)


class BaseRelatedSerializer(serializers.RelatedField):
    fields = '__all__'
    pk_name = 'id'
    force_pk_only = False

    def __init__(self, **kwargs):
        self.fields = kwargs.pop('fields', '__all__')
        self.pk_name = kwargs.pop('pk_name', 'id')
        self.pk_field = kwargs.pop('pk_field', None)
        super(BaseRelatedSerializer, self).__init__(**kwargs)

    @property
    def _meta(self):
        return self.Meta

    def to_internal_value(self, data):
        if self.pk_field is not None:
            data = self.pk_field.to_internal_value(data)

        try:
            if isinstance(data, dict) and data.has_key(self.pk_name):
                data = self.get_queryset().get(pk=data[self.pk_name])
            else:
                data = self.get_queryset().get(pk=data)
            return data
        except ObjectDoesNotExist:
            self.fail('does_not_exist', pk_value=data)
        except (TypeError, ValueError):
            self.fail('incorrect_type', data_type=type(data).__name__)

    def to_representation(self, value, force_pk_only=False):
        if self.pk_field is not None:
            return self.pk_field.to_representation(value.pk)
        if not self.use_pk_only_optimization() and not isinstance(value, bool) and not force_pk_only:
            serializer = self._meta.model_serializer_class
            value = serializer(value, read_only=True).data
        elif self.use_pk_only_optimization() or force_pk_only:
            value = getattr(value, self.pk_name)
        else:
            value = value
        return value

    def get_choices(self, cutoff=None):
        queryset = self.get_queryset()
        if queryset is None:
            # Ensure that field.choices returns something sensible
            # even when accessed with a read-only field.
            return {}

        if cutoff is not None:
            queryset = queryset[:cutoff]

        return OrderedDict([
            (
                self.to_representation(item, force_pk_only=True),
                self.display_value(item)
            )
            for item in queryset
        ])
