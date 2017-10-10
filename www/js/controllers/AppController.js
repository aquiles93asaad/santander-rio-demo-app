"user strict";

angular.module('SantanderRioApp')

.controller('AppController', AppController);

AppController.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$ionicSideMenuDelegate',
    '$ionicHistory'
];

function AppController(
    $scope,
    $rootScope,
    $state,
    $ionicSideMenuDelegate,
    $ionicHistory
) {
    $scope.$watch(function () {
		return $ionicSideMenuDelegate.isOpenLeft();
	}, function (isOpen) {
		var icon = angular.element('.menu-content .left-buttons button');
		var menu = angular.element('.menu.menu-left');
        var scrollContent = angular.element('.menu-content .scroll-content');

		if (isOpen) {
			menu.css({
                'transform' : 'translate3d(0, 0, 0)'
            });

            icon.removeClass('ion-navicon');
			icon.addClass('ion-arrow-left-c open');
            scrollContent.append('<div class="custom-backdrop"></div>');
		} else {
			menu.css({
                'transform' : 'translate3d(-320px, 0, 0)'
            });

            icon.removeClass('ion-arrow-left-c open');
			icon.addClass('ion-navicon');
            scrollContent.find('.custom-backdrop').remove();
		}
	});

    $rootScope.$on('$stateChangeSuccess', function() {
        if($state.current.name == 'app.home') {
            angular.element('.menu .menu-item').removeClass('chosen');
        }
    });

    $scope.goToHomePage = function() {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });

        $state.go('app.home');
    };
}
