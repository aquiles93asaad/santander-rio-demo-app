"user strict";

angular.module('SantanderRioApp')

.directive('slideAccordion', slideAccordion);

slideAccordion.$inject = [];

function slideAccordion() {
    var directive = {
        link: link,
        scope: true,
        restrict: 'A'
    };

    return directive;

    function link (scope, element, attrs) {
        var header = element.find('.ac-header');

        header.on('click', function() {
            if(attrs.closeOthers == "true") {
                angular.element('.item-accordion.open').not(element).removeClass('open')
            }

            element.toggleClass('open');
        })
    }
}
