"user strict";

angular.module('SantanderRioApp')

.controller('ViewRequestController', ViewRequestController);

ViewRequestController.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    '$ionicHistory',
    '$ionicModal',
    '$ionicLoading',
    '$cordovaToast',
    '$cordovaFile',
    'RequestsService',
    'ThubanMainServices'
];

function ViewRequestController(
    $scope,
    $state,
    $stateParams,
    $ionicHistory,
    $ionicModal,
    $ionicLoading,
    $cordovaToast,
    $cordovaFile,
    RequestsService,
    ThubanMainServices
) {

    $scope.pdfUrl = cordova.file.externalDataDirectory + $stateParams.fileName + '.pdf';
    $scope.showSingatureImage = false;

    var signaturePad = null;

    document.addEventListener('deviceready', function () {
        $ionicModal.fromTemplateUrl('templates/partials/signature.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.requestModal = modal;
        });

        $scope.openSignatureModal = function() {
            $scope.requestModal.show();
            signaturePad = new SignaturePad(document.getElementById('signature-pad'));
        };

        $scope.closeSignatureModal = function() {
            signaturePad.clear();
            $scope.requestModal.hide();
        };

        $scope.$on('$destroy', function() {
            $scope.requestModal.remove();
        });

        $scope.$on('modal.shown', function() {
            if (typeof globalCanvas === "undefined") {
                globalCanvas = document.getElementById('signature-pad');
                globalCtx = globalCanvas.getContext("2d");
            }

            var canvas = globalCanvas;
            var ctx = globalCtx;

            var PIXEL_RATIO = (function () {
                var dpr = window.devicePixelRatio || 1,
                    bsr = ctx.webkitBackingStorePixelRatio ||
                          ctx.mozBackingStorePixelRatio ||
                          ctx.msBackingStorePixelRatio ||
                          ctx.oBackingStorePixelRatio ||
                          ctx.backingStorePixelRatio || 1;

                return dpr / bsr;
            })();

            var ratio =  PIXEL_RATIO;
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetWidth * ratio;
            canvas.style.width = canvas.offsetWidth + "px";
            canvas.style.height = canvas.offsetWidth + "px";
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        });

        $scope.clearButton =  function() {
            signaturePad.clear();
        };

        $scope.saveSignature = function() {
            if (signaturePad.isEmpty()) {
                $cordovaToast.showShortBottom('Firme arriba primero por favor');
            } else {
                var image = document.getElementById('signature-image');
                image.src = signaturePad.toDataURL();
                $scope.showSingatureImage = true;
                $scope.requestModal.hide();
            }
        };

        $scope.clearSignatureImage = function () {
            $scope.showSingatureImage = false;
            var image = document.getElementById('signature-image');
            image.src = '';
            signaturePad.clear();
        };

        $scope.onLoad = function() {
            $ionicLoading.hide();
        }

        $scope.sendRequest = function() {
            if($scope.showSingatureImage) {
                $ionicLoading.show({
                    content: 'Loading',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                var data = {
                    requestId: $stateParams.fileName
                };

                RequestsService.updateRequest(data, angular.element('#signature-image').attr('src'))
                .then(function(success) {
                    $cordovaToast.showShortBottom('La solicitud ha sido enviada correctamente!');
                    return ThubanMainServices.getThubanResource($stateParams.fileName);
                })
                .then(function(file) {
                    return $cordovaFile.writeFile(cordova.file.externalDataDirectory, $stateParams.fileName + '.pdf', file, true);
                })
                .then(function(success) {
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go('app.requestSent', {type: $stateParams.type, itemId: $stateParams.itemId, fileName: $stateParams.fileName});
                })
                .catch(function(error) {
                    console.error(error);
                    $cordovaToast.showShortBottom('La solicitud no se pudo enviar correctamente. Intentelo de nuevo!');
                })
                // .finally(function() {
                //     $ionicLoading.hide();
                // })
            } else {
                $cordovaToast.showShortBottom('Firme la solicitud primero para poder enviarla.');
            }
        };
    }, false);
}
