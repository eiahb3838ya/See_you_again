# Generated by Django 2.2.5 on 2019-11-01 12:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('userAccount', '0003_auto_20191101_1502'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contract',
            fields=[
                ('contractHash', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('encryptedContext', models.TextField()),
                ('last_modify_date', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('idNum', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='userAccount.Profile')),
            ],
            options={
                'db_table': 'contract',
            },
        ),
    ]
