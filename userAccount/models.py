from django.db import models

# # Create your models here.
# from django.contrib.auth.models import User
#
# from django.db.models.signals import post_save
# from django.dispatch import receiver

class Profile(models.Model):

    idNum = models.CharField(max_length=18, primary_key=True)
    psw = models.CharField(max_length=20)
    publicAddress = models.CharField(max_length=70)
    publicKey = models.CharField(max_length=130)
    email = models.EmailField()


    last_modify_date = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "profile"
    # birth_date = models.DateField(null=True, blank=True)


# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)
#
# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()