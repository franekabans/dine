from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class Restaurant_Serializer(serializers.ModelSerializer):
	class Meta:
		model = Restaurants
		fields = '__all__'

class Tables_Serializer(serializers.ModelSerializer):
	class Meta:
		model = Tables
		fields = '__all__'

########menu########################################################


class Categories_Menu_Serializer(serializers.ModelSerializer):
	restaurant = Restaurant_Serializer(many=True, read_only =True)

	class Meta:
		model = Categories_Menu
		fields = '__all__'

class Food_Serializer(serializers.ModelSerializer):
	Categories_Menu = Categories_Menu_Serializer(many=True, read_only =True)

	class Meta:
		model = Food
		fields = '__all__'



############################################################
########zamowienia####
##### 
class Clients_Dine_Serializer(serializers.ModelSerializer):
	class Meta:
		model = Clients_Dine
		fields = '__all__'


class Owner_Serializer(serializers.ModelSerializer):
	class Meta:
		model = Owner
		fields = '__all__'


class Orders_Serializer(serializers.ModelSerializer):
	Restaurant = Restaurant_Serializer(many = True,read_only = True)
	Clients = Clients_Dine_Serializer(many = False,read_only = True)

	class Meta:
		model = Orders_Dine
		fields = '__all__'



### password hashing within **validated_data
class User_Serializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = '__all__'
		extra_kwargs = {'password:': {'write_only': True, 'required': True}}
		
	def create(self,validated_data):
		user = User.objects.create_user(**validated_data)
		Token.objects.create(user=user)
		return user


