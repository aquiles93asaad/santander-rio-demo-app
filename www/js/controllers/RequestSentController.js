"user strict";

angular.module('SantanderRioApp')

.controller('RequestSentController', RequestSentController);

RequestSentController.$inject = [
    '$scope',
    '$cordovaToast',
    '$state',
    '$stateParams',
    '$ionicHistory'
];

function RequestSentController(
    $scope,
    $cordovaToast,
    $state,
    $stateParams,
    $ionicHistory
) {

    $scope.form = {
        pinNumber: ''
    };

    $scope.showSuccessMessage = function() {
        if($scope.form.pinNumber.length == 4) {
            $cordovaToast.showShortBottom('La solicitud ha sido ingresada correctamente.');
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.products', {type: $stateParams.type});
        } else {
            $cordovaToast.showShortBottom('El código PIN debe ser de 4 dígitos!');
        }
    }
}
