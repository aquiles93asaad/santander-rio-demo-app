"user strict";

angular.module('SantanderRioApp')

.controller('ProductActionsController', ProductActionsController);

ProductActionsController.$inject = [
    '$scope',
    '$state',
    '$cordovaCamera',
    '$cordovaToast',
    '$cordovaFile',
    '$ionicLoading',
    '$ionicHistory',
    'product',
    'RequestsService',
    'ProcessDniInfoService',
    'ThubanConfigService'
];

function ProductActionsController(
    $scope,
    $state,
    $cordovaCamera,
    $cordovaToast,
    $cordovaFile,
    $ionicLoading,
    $ionicHistory,
    product,
    RequestsService,
    ProcessDniInfoService,
    ThubanConfigService
) {
    $scope.form = {
        dni: null,
        address: null,
        email: null,
        product: product.name
    }

    $scope.showDniImage = false;
    $scope.showDataForm = false;

    var dniImage = null;
    var microblinkLicense = null;

    ThubanConfigService.getGeneralConfig()
    .then(function(generalConfig) {
        microblinkLicense = generalConfig.microblinkLicense;
    })
    .catch(function(error) {
        console.error(error);
    });

    document.addEventListener('deviceready', function () {

        var encodingType = Camera.EncodingType.JPEG;

        var cameraOptions = {
            quality: 100,
            targetWidth: 750,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: encodingType,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: false
        };

        if(encodingType == 0) {
            encodingType = 'jpg';
        } else {
            encodingType = 'png';
        }

        $scope.takePicture = function() {
            $cordovaCamera.getPicture(cameraOptions)
            .then(function(imageData) {

                dniImage = 'data:image/' + encodingType + ';base64,' + imageData;
                $scope.showDniImage = true;
                var image = document.getElementById('dni-image');
                image.src = dniImage;

            }, function(err) {

                console.log(err);
                $cordovaToast.showShortBottom('No se pudo tomar la foto. Intentelo de nuevo.');

            });
        };

        $scope.scanDni = function() {
            var types = ['USDL', 'QR Code', 'PDF417'];

            var options = {
                beep : false,  // Beep off
                noDialog : true, // Skip confirm dialog after scan
                uncertain : false, //Recommended
                quietZone : false, //Recommended
                highRes : false, //Recommended
                inverseScanning: false,
                frontFace : false
            };

            var licenseiOs = null;
            cordova.plugins.pdf417Scanner.scan(

                // Register the callback handler
                function callback(scanningResult) {

                    $ionicLoading.show({
                        content: 'Loading',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    // handle cancelled scanning
                    if (scanningResult.cancelled == true) {

                        $cordovaToast.showShortBottom('El escaneo fue cancelado.');
                        $ionicLoading.hide();
                        return;

                    }
                    // Obtain list of recognizer results
                    var resultList = scanningResult.resultList;
                    // Iterate through all results
                    for (var i = 0; i < resultList.length; i++) {

                        var recognizerResult = resultList[i];

                        if (recognizerResult.resultType == 'Barcode result') {
                            // handle Barcode scanning result
                            var dataSplit = recognizerResult.data.split('@');
                            $scope.form.dni = ProcessDniInfoService.getInfo(dataSplit);
                            $scope.showDataForm = true;
                            $ionicLoading.hide();
                        }
                    }
                },

                // Register the error callback
                function errorHandler(err) {
                    $ionicLoading.hide();
                    console.log(err);
                    $cordovaToast.showShortBottom('El escaneo no se hizo correctamente. Intentelo de nuevo!');
                },

                types, options, licenseiOs, microblinkLicense
            );
        };

        $scope.sendData = function() {
            if($scope.showDniImage) {

                if($scope.showDataForm) {

                    $ionicLoading.show({
                        content: 'Loading',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });

                    RequestsService.newRequest($scope.form)
                    .then(function(docId) {
                        fileId = docId;

                        var docData = {
                            nroSolicitud: docId,
                            dni: $scope.form.dni.dniNumber,
                            name: $scope.form.dni.name,
                            lastName: $scope.form.dni.lastName
                        };

                        return RequestsService.newIdentificationDocument(docData, dniImage, encodingType);

                    }).then(function(success) {

                        return RequestsService.getRequestFile(fileId)

                    }).then(function(file) {

                        return $cordovaFile.writeFile(cordova.file.externalDataDirectory, fileId + '.pdf', file, true)

                    }).then(function(success) {

                        $cordovaToast.showShortBottom('Sus datos fueron enviados correctamente!');

                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });

                        $state.go('app.viewRequest', {type: product.category, itemId: product.id, fileName: fileId});

                    })
                    .catch(function(error) {

                        console.error(error);
                        $cordovaToast.showShortBottom('Sus datos no fueron enviados correctamente. Intente de nuevo por favor!');

                    })
                    .finally(function() {

                        $ionicLoading.hide();

                    });
                } else {

                    $cordovaToast.showShortBottom('Realice un scan de su DNI por favor.');

                }
            } else {

                $cordovaToast.showShortBottom('Tome una foto de su DNI por favor.');

            }
        };

        $scope.clearDniImage = function () {
            $scope.showDniImage = false;
            var image = document.getElementById('dni-image');
            image.src = '';
            dniImage = null;
        };

        $scope.clearDataForm = function () {
            $scope.showDataForm = false;
            $scope.form = {
                dni: {
                    lastName: null,
                    name: null,
                    gender: null,
                    birthDate: null,
                    number: null,
                },
                address: null,
                email: null,
                product: product.name
            }
        };
    }, false);
}
