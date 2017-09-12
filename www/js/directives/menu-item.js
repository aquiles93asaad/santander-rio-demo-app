"user strict";

angular.module('SantanderRioApp')

.directive('menuItem', menuItem);

menuItem.$inject = [
    '$state',
    '$timeout',
    '$stateParams',
    '$ionicHistory',
    '$ionicSideMenuDelegate'
];

function menuItem(
    $state,
    $timeout,
    $stateParams,
    $ionicHistory,
    $ionicSideMenuDelegate
) {

    var directive = {
        link: link,
        scope: true,
        restrict: 'A'
    };

    return directive;

    function link (scope, element, attrs) {
        setChosen(element);
        angular.element(element).on('click', function() {
            if(attrs.url != undefined) {
                setChosen(element, true);
                $ionicSideMenuDelegate.toggleLeft();

                angular.element('.menu.menu-left').css({
                    'transform' : 'translate3d(-320px, 0, 0)'
                });

                $ionicHistory.nextViewOptions({
                    disableBack: true
                });

                if(attrs.urlparams != undefined) {
                    var params = JSON.parse(attrs.urlparams);
                    $state.go(attrs.url, params);
                } else {
                    $state.go(attrs.url);
                }
            } else {
                return true;
            }
        });

        function setChosen(elem, isClicked = false) {
            var isChosen = false;
            var parent = elem.parents('.has-submenu');

            if(!isClicked) {
                if($state.current.name === attrs.url) {
                    if($stateParams.type) {
                        if($stateParams.type === JSON.parse(elem.attr('data-urlParams')).type) {
                            isChosen = true;
                        }
                    } else
                        isChosen = true;
                }
            } else {
                isChosen = true;
            }

            if(isChosen) {
                //angular.element('.menu-left .submenu').removeClass('chosen open');
                angular.element('.menu-left .item').removeClass('chosen open');
                elem.addClass('chosen');

                if(parent.length !== 0) {
                    parent.addClass('open');
                    //parent.find('.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');
                }
            }
        }
    }
}
