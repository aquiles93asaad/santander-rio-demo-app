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
    });

    $scope.setConfiguration = function() {

        var emptyValue = null;
        var configToSet = {};

        configToSet = getConfigToSet($scope.config, configToSet);

        for (key in configToSet) {
            if (configToSet.hasOwnProperty(key)) {
                if(configToSet[key] === null || configToSet[key] === "") {
                    emptyValue = key;
                    break;
                }
            }
        }

        if(emptyValue === null) {
            ThubanConfigService.setConfig(configToSet)
            .then(function() {
                $cordovaToast.showShortBottom('La configuración se guardó correctamente!');
            })
            .catch(function(error) {
                $cordovaToast.showShortBottom('No se guardó la configuración.' + error);
            });
        } else
            $cordovaToast.showShortBottom('El valor ' + emptyValue + ' no puede ser vacío.');
    };

    function getConfigToSet(config, configToSet) {
        angular.forEach(config, function(value, key) {
            if(config.hasOwnProperty(key)) {
                if(typeof value === 'object' ) {
                    getConfigToSet(value, configToSet);
                } else {
                    configToSet[key] = value;
                }
            }
        });

        return configToSet;
    }
}
