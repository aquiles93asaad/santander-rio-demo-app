"user strict";

angular.module('SantanderRioApp')

.controller('ConfigurationController', ConfigurationController);

ConfigurationController.$inject = [
    '$scope',
    '$cordovaToast',
    'ThubanConfigService'
];

function ConfigurationController(
    $scope,
    $cordovaToast,
    ThubanConfigService
) {
    ThubanConfigService.getConfig()
    .then(function(config) {
        $scope.config = config;
    })
    .catch(function(error) {
        console.error(error);
    })

    $scope.setConfiguration = function() {

        var emptyValue = null;

        for(key in $scope.config)
            if($scope.config[key] == null || $scope.config[key] == '') {
                emptyValue = key;
                break;
            }

        if(emptyValue === null) {
            ThubanConfigService.set($rootScope.thubanConfig)
            .then(function() {
                $cordovaToast.showShortBottom('La configuración se guardó correctamente!');
            })
            .catch(function(error) {
                $cordovaToast.showShortBottom('No se guardó la configuración.' + error);
            });
        } else
            $cordovaToast.showShortBottom('El valor ' + emptyValue + ' no puede ser vacío.');
    }
}
