"user strict";

angular.module('SantanderRioApp')

.controller('AppController', AppController);

AppController.$inject = ['$scope', '$ionicSideMenuDelegate'];

function AppController($scope, $ionicSideMenuDelegate) {
    $scope.toggleMenu = function() {
        if($ionicSideMenuDelegate.isOpen()) {
            angular.element('.menu.menu-left').css({
                'transform' : 'translate3d(-320px, 0, 0)'
            });
        } else {
            angular.element('.menu.menu-left').css({
                'transform' : 'translate3d(0, 0, 0)'
            });
        }
    }
}
