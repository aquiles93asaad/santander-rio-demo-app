"user strict";

angular.module('ThubanServices')

.service('ThubanSignPdfService', ThubanSignPdfService);

ThubanSignPdfService.$inject = [
    '$q',
    'ThubanConfigService',
    'ProcessFieldsStringService'
];

function ThubanSignPdfService(
    $q,
    ThubanConfigService,
    ProcessFieldsStringService
) {

    /******************/
    /* PUBLIC METHODS
    /*****************/

    return {
        signPdf: signPdf
    };

    /****************/
	/* PRIVATE METHODS
	/****************/

    function signPdf(itemId, fields, file, isBase64Encoded = false, solution) {
        var deferred = $q.defer();
        var url = '';

        ThubanConfigService.getConfig()
        .then(function(config) {
            url += config.general.httpURL;
            url += config.services.signService;
            url += '&id=' + itemId;
            url += ProcessFieldsStringService.createFieldValueString(fields);
            url += '&isBase64Encoded=' + isBase64Encoded;
            url += '&imageSize=' + config.templates[solution].signatureImageSize;
            url += '&xPos=' + config.templates[solution].signatureXPos;
            url += '&yPos=' + config.templates[solution].signatureYPos;
            url += '&token=' + config.general.token;

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', url, true);
            xmlhttp.setRequestHeader('Content-Type', 'application/octet-stream');

            xmlhttp.onreadystatechange = function () {
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    deferred.resolve(xmlhttp.response);
                } else if(xmlhttp.readyState == 4 && xmlhttp.status != 200){
                    deferred.reject(xmlhttp.response);
                }
            }

            xmlhttp.send(file);
        })
        .catch(function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }
}
