from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from django.http import JsonResponse

from .serializers import ProfileSerializer
from .models import Profile

# Create your views here.

class ProfileCheckLogin(APIView):

    def post(self, request, format=None):

        print("request:", request)
        print("method:", request.method)
        print("body:", request.body)
        print("data:", request.data)

        data = JSONParser().parse(request)
        print("parsed:", data)
        idNum = data['idNum']
        psw = data['psw']
        try:
            profile = Profile.objects.get(idNum=idNum, psw = psw)
            res = {
                "code": "1"
            }
            return JsonResponse(res)
        except Profile.DoesNotExist:
            res = {
                "code": "0"
            }
            return JsonResponse(res)



class ProfileCreate(APIView):
    def get(self, request, format=None):
        snippets = Profile.objects.all()
        serializer = ProfileSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, format=None):
        print("request:", request)
        print("method:", request.method)
        print("body:", request.body)
        print("data:", request.data)

        data = JSONParser().parse(request)
        print("parsed:", data)

        serializer = ProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            res = {
                "code":"1"
            }
            return JsonResponse(res, status=201)
        res = {
            "code": "0"
        }
        return JsonResponse(res, status=400)


