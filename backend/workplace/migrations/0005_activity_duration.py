# Generated by Django 3.0.2 on 2020-02-05 07:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workplace', '0004_auto_20200129_1135'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='duration',
            field=models.IntegerField(null=True),
        ),
    ]