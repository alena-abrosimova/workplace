# Generated by Django 3.0.3 on 2021-04-05 09:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workplace', '0013_report_label'),
    ]

    operations = [
        migrations.CreateModel(
            name='ActivityTimerSettings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ended', models.TimeField()),
            ],
            options={
                'verbose_name': '[ActivityTimerSettings] Настройки таймера активности',
                'verbose_name_plural': '[ActivityTimerSettings] Настройки таймера активности',
            },
        ),
        migrations.AddField(
            model_name='activitytimer',
            name='completed',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='activitytimer',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='activitytimer',
            name='state',
            field=models.IntegerField(choices=[(0, 'В процессе'), (1, 'Завершен')], default=0, null=True),
        ),
        migrations.AddField(
            model_name='activitytimer',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]