from rest_framework_extensions.routers import ExtendedSimpleRouter
from dine_app.viewsets import RestaurantView,ClientView,FoodView,CategoriesView,OrdersView,UserView,OwnerResIdView,CurrentOrdersView,ClientCurrentOrdersView

#nested router needed and changes in view probably



router = ExtendedSimpleRouter()
(	

    router.register(r'restaurants', RestaurantView, basename='restaurants')
          .register(r'categories',
                    CategoriesView,
                    basename='restaurants-categories',
                    parents_query_lookups=['res_id'])
          .register(r'food',
                    FoodView,
                    basename='restaurants-categories-food',
                    parents_query_lookups=['cat_id__res_id','cat_id']),

)


(
    router.register(r'restaurants', RestaurantView).register(r'orders',OrdersView,basename='restaurants-order',parents_query_lookups=['res_id'])
)

(
    router.register(r'restaurants', RestaurantView).register(r'currentorders',CurrentOrdersView,basename='restaurants-currentorder',parents_query_lookups=['res_id'])
)



urlpatterns = router.urls
router.register('currentorders', CurrentOrdersView)
router.register('currentclient',ClientCurrentOrdersView)
router.register('client', ClientView)
router.register('categories', CategoriesView)
router.register('food', FoodView)
router.register('orders', OrdersView)
router.register('users', UserView)
router.register('resid',OwnerResIdView)



