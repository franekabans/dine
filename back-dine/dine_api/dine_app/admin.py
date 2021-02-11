from django.contrib import admin

# Register your models here.
from .models import Owner,Restaurants,Categories_Menu,Food

admin.site.register(Owner)
admin.site.register(Restaurants)
admin.site.register(Categories_Menu)
admin.site.register(Food)
