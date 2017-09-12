"user strict";

angular.module('SantanderRioApp')

.controller('ChecksController', ChecksController);

ChecksController.$inject = [
    '$scope',
    '$cordovaCamera',
    '$cordovaToast',
    '$ionicLoading',
    '$ionicHistory'
];

function ChecksController (
    $scope,
    $cordovaCamera,
    $cordovaToast,
    $ionicLoading,
    $ionicHistory
) {
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

        if(encodingType == 0)
            encodingType = 'jpg';
        else
            encodingType = 'png';


    });
}
