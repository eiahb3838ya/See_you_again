
from rest_framework import serializers
from .models import Profile




class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['idNum', 'psw', 'publicKey', 'publicAddress','email', 'last_modify_date', 'created']