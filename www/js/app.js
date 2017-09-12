"user strict";

angular.module('SantanderRioApp', ['ionic', 'ngCordova', 'ThubanServices', 'pdf'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/partials/menu.html',
        controller: 'AppController'
    })

    .state('app.products', {
        url: '/products/:type',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/products.html',
                controller: 'ProductsController'
            }
        },
        productsService: 'ProductsService',
        resolve: {
            products:  function(ProductsService, $stateParams, $ionicLoading){
                $ionicLoading.show({
                    content: 'Loading',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                return ProductsService.getProductsByCategory($stateParams.type)
                   .then (function (data) {
                       $ionicLoading.hide();
                       return data;
                   })
                   .catch(function(error) {
                       $ionicLoading.hide();
                       console.log(error);
                   });
            }
        }
    })

    .state('app.product', {
        url: '/products/:type/:itemId',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/product.html',
                controller: 'ProductController'
            }
        },
        productsService: 'ProductsService',
        resolve: {
            product:  function(ProductsService, $stateParams, $ionicLoading){
                $ionicLoading.show({
                    content: 'Loading',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                return ProductsService.getProductById($stateParams.itemId)
                   .then (function (data) {
                       $ionicLoading.hide();
                       return data;
                   })
                   .catch(function(error) {
                       $ionicLoading.hide();
                       console.log(error);
                   });
            }
        }
    })

    .state('app.checks', {
        url: '/checks/:type',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/checks.html',
                controller: 'ChecksController'
            }
        }
    })

    .state('app.actions', {
        url: '/products/:type/:itemId/actions',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/product-actions.html',
                controller: 'ProductActionsController'
            }
        },
        productsService: 'ProductsService',
        resolve: {
            product:  function(ProductsService, $stateParams, $ionicLoading){
                $ionicLoading.show({
                    content: 'Loading',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                return ProductsService.getProductById($stateParams.itemId)
                   .then (function (data) {
                       $ionicLoading.hide();
                       return data;
                   })
                   .catch(function(error) {
                       $ionicLoading.hide();
                       console.log(error);
                   });
            }
        }
    })

    .state('app.viewRequest', {
        url: '/products/:type/:itemId/view-request/:fileName',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/view-request.html',
                controller: 'ViewRequestController'
            }
        }
    })

    .state('app.requestSent', {
        url: '/products/:type/:itemId/request-sent',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/request-sent.html',
                controller: 'RequestSentController'
            }
        }
    })

    .state('app.config', {
        url: '/configuration',
        views: {
            'menuContent': {
                templateUrl: 'templates/pages/configuration.html',
                controller: 'ConfigurationController'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('app/products/cards');
})

.run(function($ionicPlatform, ThubanConfigService, $rootScope) {

    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            // cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        ThubanConfigService.initializeConfig()
        .then(function(success) {
            console.log('Configuración inicializada corractamente.');
        })
        .catch(function(error) {
            console.error(error);
        });
    });
});
