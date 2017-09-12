"user strict";

angular.module('SantanderRioApp')

.controller('ProductController', ProductController);

ProductController.$inject = ['$scope', 'product'];

function ProductController($scope, product) {
    $scope.product = product;
}
