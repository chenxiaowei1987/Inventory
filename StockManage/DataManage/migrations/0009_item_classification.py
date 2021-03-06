# Generated by Django 2.0.7 on 2018-07-09 19:24

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('DataManage', '0008_auto_20180709_1435'),
    ]

    operations = [
        migrations.CreateModel(
            name='Item_Classification',
            fields=[
                ('ClassificationName', models.CharField(max_length=100)),
                ('ClassificationId', models.UUIDField(default=uuid.uuid1, editable=False, primary_key=True, serialize=False)),
                ('Enable', models.BooleanField(default=True)),
                ('date_time', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-date_time'],
            },
        ),
    ]
