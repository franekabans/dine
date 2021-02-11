from .models import * 
from rest_framework import viewsets
from .serializers import *
from rest_framework_extensions.mixins import NestedViewSetMixin
from django.contrib.auth.models import User
from django.contrib.auth import views as auth_views
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from url_filter.integrations.drf import DjangoFilterBackend

class ClientView(NestedViewSetMixin,viewsets.ModelViewSet):
	queryset = Clients_Dine.objects.all()
	serializer_class = Clients_Dine_Serializer

# below needed an order by statement

class RestaurantView(NestedViewSetMixin, viewsets.ModelViewSet):
	queryset = Restaurants.objects.all()
	serializer_class = Restaurant_Serializer


class CategoriesView(NestedViewSetMixin, viewsets.ModelViewSet):
	queryset = Categories_Menu.objects.all()
	serializer_class = Categories_Menu_Serializer

class FoodView(NestedViewSetMixin, viewsets.ModelViewSet):
	queryset = Food.objects.all()
	serializer_class = Food_Serializer

########################################################################orders two different kinds because of restaurant logic

class OrdersView(NestedViewSetMixin,viewsets.ModelViewSet):
	queryset = Orders_Dine.objects.filter(accepted=False)
	serializer_class = Orders_Serializer


class CurrentOrdersView(NestedViewSetMixin,viewsets.ModelViewSet):
	queryset = Orders_Dine.objects.filter(accepted=True).order_by('-order_time')
	serializer_class = Orders_Serializer

class ClientCurrentOrdersView(NestedViewSetMixin,viewsets.ModelViewSet):
	queryset = Orders_Dine.objects.filter(accepted=True)
	serializer_class = Orders_Serializer
	filter_backends = [DjangoFilterBackend]
	filter_fields = ['res_id', 'cli_id']

################################################################################

class OwnersView(viewsets.ModelViewSet):
	queryset = Owner.objects.all()
	serializer_class = Owner_Serializer


class UserView(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = User_Serializer

###getting restaurant id from current user
class OwnerResIdView(viewsets.ModelViewSet):
	permission_classes = [IsAuthenticated]
	authentication_classes = [TokenAuthentication] 
	queryset = Owner.objects.only('res_id')
	serializer_class = Owner_Serializer
	
	def get_queryset(self):
		return Owner.objects.filter(user=self.request.user.id)

############

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class Logout(APIView):
	permission_classes = [IsAuthenticated]
	authentication_classes = [TokenAuthentication] 

	@staticmethod
	def delete(request, *args, **kwargs):
	    request.user.auth_token.delete()
	    data = {
	        "message": "You have successfully logged out.",
	    }
	    return Response(data, status=status.HTTP_200_OK)


