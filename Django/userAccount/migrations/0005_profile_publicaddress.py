# Generated by Django 2.2.5 on 2019-11-03 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userAccount', '0004_auto_20191103_2107'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='publicAddress',
            field=models.CharField(default='', max_length=45),
            preserve_default=False,
        ),
    ]
