# Generated by Django 2.1 on 2018-08-05 18:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lib', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='pub_house',
            new_name='publisher',
        ),
    ]
