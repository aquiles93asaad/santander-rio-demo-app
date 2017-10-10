"user strict";

angular.module('SantanderRioApp')

.controller('RequestSentController', RequestSentController);

RequestSentController.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    '$cordovaToast',
    '$cordovaFile',
    '$ionicHistory',
    '$ionicLoading'
];

function RequestSentController(
    $scope,
    $state,
    $stateParams,
    $cordovaToast,
    $cordovaFile,
    $ionicHistory,
    $ionicLoading
) {
    $scope.pdfUrl = cordova.file.externalDataDirectory + $stateParams.fileName + '.pdf';

    $scope.form = {
        pinNumber: ''
    };

    $scope.onLoad = function() {
        $ionicLoading.hide();
    }

    $scope.showSuccessMessage = function() {
        if($scope.form.pinNumber.length == 4) {
            $cordovaToast.showShortBottom('La solicitud ha sido ingresada correctamente.');
            $cordovaFile.removeFile(cordova.file.externalDataDirectory, $stateParams.fileName + '.pdf');
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.home');
        } else {
            $cordovaToast.showShortBottom('El código PIN debe ser de 4 dígitos!');
        }
    }
}
