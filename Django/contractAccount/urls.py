from django.urls import path,include
from . import views



app_name = 'contractAccount'
urlpatterns = [


    # API CHART DATA
    path('updateContract', views.UpdateContract.as_view(), name="updateContract"),
    path('deathCertification', views.DeathCertification.as_view(), name="deathCertification"),
    path('relativeContracts', views.RelativeContracts.as_view(), name="relativeContracts"),


    # path('', views.returnOne),
    # path('account_create', views.ProfileCreate.as_view(), name="account_create"),





]