# Generated by Django 2.2.5 on 2019-11-03 13:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userAccount', '0003_auto_20191101_1502'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='publicKey',
            field=models.CharField(max_length=45),
        ),
    ]
