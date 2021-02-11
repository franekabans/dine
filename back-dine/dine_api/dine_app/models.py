from django.db import models
###
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist
# added to link one to one owner of restaurant with a user model#

# Create your models here.
from django.contrib.gis.db import models as gis_models
from django.contrib.postgres.fields import ArrayField,JSONField
from django.contrib.gis import geos
from django.db import models
from datetime import datetime

# class called restaurants equal to dine_restaurans in sql, idea : maybe it could inherit from some other class containg 
#function that will be parsed within the argument string-geometryin text to funcion which will help to 





########restauracja########################################################
class Restaurants(models.Model):
	name = models.CharField(max_length = 50) 
	poly = gis_models.PolygonField(srid=2180)
	address_line1 = models.CharField(max_length = 50)
	address_line2 = models.CharField(max_length = 50)


class Tables(models.Model):
	res_id = models.ForeignKey("Restaurants", on_delete = models.SET_NULL,null = True)
	t_number = models.IntegerField()
	vacant = models.BooleanField(default = False)
	square = gis_models.PolygonField(srid=2180)

	

########menu########################################################

class Categories_Menu(models.Model):
	res_id = models.ForeignKey("Restaurants", on_delete = models.SET_NULL, null = True)
	header = models.TextField(default = 'header empty')
	category = models.CharField(max_length = 50)
	origin = models.CharField(max_length = 50)


class Food(models.Model):
	cat_id = models.ForeignKey("Categories_Menu", on_delete = models.SET_NULL, null = True)
	name = models.CharField(max_length = 50)
	is_sizeable = models.BooleanField(default = False),
	sizes = ArrayField(models.CharField(max_length = 20), default = True)
	money_value = models.DecimalField(default = 00.0,decimal_places=2,max_digits =5)

############################################################
########zamowienia####
##### 
class Clients_Dine(models.Model):
	location = gis_models.PointField(srid = 2180)
	email = models.CharField(max_length = 50)
	phone_number = models.CharField(max_length = 12,unique=True,primary_key=True)



#class Orders_client(models.Model):
#	client_id, restaurant_id food_list (not foreign key) money_amount,payment ,order time,order_aproximate_time, takeaway 
#

class Orders_Dine(models.Model):
	cli_id = models.ForeignKey("Clients_Dine", on_delete = models.CASCADE)
	res_id = models.ForeignKey("Restaurants", on_delete = models.SET_NULL,null = True)
	foods_id = ArrayField(JSONField(), default = True)
	payment = models.BooleanField(default = True)
	take_away = models.BooleanField(default = True)
	money_amout = models.DecimalField(decimal_places=2,max_digits=8)
	order_time = models.DateTimeField(default=datetime.now, blank=True)
	order_aproximate_time = models.DateTimeField()
	accepted = models.BooleanField(default = False)



############################################################

class Owner(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE,primary_key=True,default=1)
	res_id = models.ForeignKey("Restaurants", on_delete = models.SET_NULL,null = True)
	name = models.CharField(max_length = 50)
	email = models.CharField(max_length = 50)
	surname = models.CharField(max_length = 50)
	phone_number = models.CharField(max_length = 50)

@receiver(post_save, sender=User)
def create_user_owner(sender, instance, created, **kwargs):
    try:
        instance.owner.save()
    except ObjectDoesNotExist:
        Owner.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_owner(sender, instance, **kwargs):
    instance.owner.save()






