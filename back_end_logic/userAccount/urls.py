from django.urls import path,include
from . import views
# from .apis import table_data,chart_data, portfolio_chart_div
from django.contrib.auth import views as auth_views


app_name = 'userAccount'
urlpatterns = [


    # API CHART DATA
    # path('api/chart/from_r/return', chart_data.StrategyFromRReturnData.as_view(), name="api_chart_return_data"),

    # path('', views.returnOne),
    path('logup', views.ProfileCreate.as_view(), name="account_create"),
    path('login', views.ProfileCheckLogin.as_view(), name="account_login"),





]