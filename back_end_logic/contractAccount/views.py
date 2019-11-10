from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser

from .testamentCreater import TestamentCreater
from userAccount.models import Profile
from .models import ContractRelatives, Contract
# Create your views here.

from ecies import encrypt, decrypt


class UpdateContract(APIView):

    def post(self, request, format=None):
        print("request:", request)
        print("method:", request.method)
        print("body:", request.body)
        print("data:", request.data)
        data = JSONParser().parse(request)
        print("parsed:", data)
        idNum = data['idNum']
        content = data['content']
        relativeIdNums = data['relativeIdNums']
        private_key = data['private_key']
        try:
            myAddress = Profile.objects.get(idNum=idNum).publicAddress
            print("myAddress", myAddress)
        except Profile.DoesNotExist:
            res = {
                "code": "0"
            }
            return JsonResponse(res)

        # make contract
        try:
            t_c = TestamentCreater(myAddress=myAddress)
            compiledContract = t_c.getContractCompiled()
            messageHashHex, sigHex = t_c.signTestamentContent(content, private_key)
            contractHash = t_c.createTestamentContract(messageHashHex, sigHex)
        except Exception as e:
            print(e)
            res = {
                "code": "0"
            }
            return JsonResponse(res)

        # encrypt
        encrypted = bytes(content, encoding="utf8")
        for aRelativeIdNum in relativeIdNums:
            try:
                aRelative = Profile.objects.get(idNum=aRelativeIdNum)
                aPublicKey = aRelative.publicKey
                print("get a PublicKey of relative", aPublicKey)
            except Profile.DoesNotExist:
                res = {
                    "code": "0"
                }
                return JsonResponse(res)

            encrypted = encrypt(aPublicKey, encrypted)
            print("encrypted done", encrypted)

        # put into database
        # contract
        prevContract = Contract.objects.filter(idNum=idNum)

        if len(prevContract) > 0:
            print("delete old things")
            prevContract.delete()
        try:
            Contract.objects.create(idNum=Profile(idNum = idNum), contractHash = contractHash, encryptedContext = encrypted)
            print("Contract created with contractHash:", contractHash)
        except Profile.DoesNotExist:
            res = {
                "code": "0"
            }
            return JsonResponse(res)
        # contractRelatives
        for aRelativeIdNum in relativeIdNums:
            ContractRelatives.objects.create(contractHash=Contract(contractHash=contractHash), idNum = Profile(idNum=aRelativeIdNum))
        res = {
            "code":"1",
            "contractHash": contractHash
        }

        return JsonResponse(res)


class DeathCertification(APIView):

    def post(self, request, format=None):
        data = JSONParser().parse(request)
        # print("parsed:", data)
        idNum = data['idNum']
        try:
            deadPerson = Profile(idNum = idNum)
        except Profile.DoesNotExist:
            res = {
                "code": "0"
            }
            return JsonResponse(res)
        try:
            revealContract = Contract.objects.get(idNum = deadPerson)
            revealContract.reveal = True
            revealContract.save()
        except Contract.DoesNotExist:
            res = {
                "code": "0"
            }
            return JsonResponse(res)

        res = {
            "code":"1",

        }
        return JsonResponse(res)

class RelativeContracts(APIView):

    def post(self, request, format=None):
        print("request:", request)
        print("method:", request.method)
        print("body:", request.body)
        print("data:", request.data)
        data = JSONParser().parse(request)
        print("parsed:", data)
        idNum = data['idNum']
        try:
            relativeProfile = Profile(idNum = idNum)
        except Profile.DoesNotExist:
            res = {
                "code": "0"
            }
            return JsonResponse(res)
        try:
            contractHashList = list(ContractRelatives.objects.filter(idNum=relativeProfile).values_list("contractHash", flat = True))
        except RelativeContracts.DoesNotExist:
            res = {
                "code": "0"
            }
            return JsonResponse(res)

        contracts = []
        for ah in contractHashList:
            if not Contract.objects.get(contractHash = ah).reveal:
                print(Contract)
                print(Contract.objects.get(contractHash = ah).reveal)
                continue;
            else:
                encroptedContent = Contract.objects.get(contractHash = ah).encryptedContext
                try:
                    thisContract = Contract.objects.get(contractHash = ah)
                    ownerProfile = thisContract.idNum
                    ownerPublicKey = ownerProfile.publicKey
                    ownerPublicAddress = ownerProfile.publicAddress
                except:
                    res = {
                        "code": "0"
                    }
                    return JsonResponse(res)
                idNums = list(ContractRelatives.objects.filter(contractHash = thisContract).values_list("idNum", flat = True))

                t_c = TestamentCreater(myAddress=ownerPublicAddress)
                contentHash = t_c.getMessageHashHex(ah)
                ownerSig = t_c.getSigHex(ah)

                toAppend = {
                    "contractHash":ah,
                    "encroptedContent":str(encroptedContent),

                    "contentHash":contentHash,
                    "ownerSig":ownerSig,

                    "ownerPublicKey":ownerPublicKey,
                    "idNums":idNums
                }

                contracts.append(toAppend)




        res = {
            "contracts":contracts

        }
        return JsonResponse(res)