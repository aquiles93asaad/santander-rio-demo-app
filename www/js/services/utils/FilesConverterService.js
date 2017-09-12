"user strict";

angular.module('SantanderRioApp')

.service('FilesConverterService', function() {

    /****************/
    /* PUBLIC METHODS
    /****************/
    return {
        base64ToBinary: base64ToBinary
    }

    /****************/
    /* PRIVATE METHODS
    /****************/
    function base64ToBinary(dataURI) {
        var BASE64_MARKER = ';base64,';
        var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        var base64 = dataURI.substring(base64Index);
        var raw = window.atob(base64);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));

        for(i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }

        return array;
    }
});
