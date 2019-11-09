from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from testt.serializers import UserSerializer, GroupSerializer
from django.http import HttpResponse, JsonResponse

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

# from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from rest_framework.parsers import JSONParser


import json
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

@api_view(['GET', 'POST'])
@csrf_exempt
def returnOne(request):
    if request.method == "GET":
        print(request.body)
        res = {
            "code":"1"
        }
        return(JsonResponse(res, safe=False))
    elif request.method == "POST":
        print(request.body)
        res = {
            "code":"1"
        }
        return(JsonResponse(res, safe=False))
    # return(HttpResponse(json.dumps(res), content_type="application/json"))


# @csrf_exempt
class ReturnOne(APIView):
    allowed_methods = ['get', 'post', 'put', 'delete', 'options']

    # def options(self, request):
    #     print(request.method)
    #     response = HttpResponse()
    #     response['allow'] = ','.join(self.allowed_methods)
    #     return response
    def post(self, request, format=None):
        # print(request.POST)
        print("request:", request)
        print("method:", request.method)
        print("body:", request.body)
        print(request.POST.get("test"))
        data = {
            "code": "1"
        }
        return (JsonResponse(data, safe = False))