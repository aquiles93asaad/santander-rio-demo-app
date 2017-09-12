"user strict";

angular.module('SantanderRioApp')

.controller('ProductsController', ProductsController);

ProductsController.$inject = ['$scope', 'products'];

function ProductsController($scope, products) {
    $scope.products = products;
}
