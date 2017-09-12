"use strict";

angular.module('ThubanServices')

.service('ThubanCreatePdfService', ThubanCreatePdfService);

ThubanCreatePdfService.$inject = [
    '$q',
    'ThubanConfigService',
    'ProcessFieldsStringService'
];

function ThubanCreatePdfService(
    $q,
    ThubanConfigService,
    ProcessFieldsStringService
) {

    /******************/
    /* PUBLIC METHODS
    /*****************/

    return {
        createPdf: createPdf
    }

    /****************/
	/* PRIVATE METHODS
	/****************/

    function createPdf(fields) {
        var deferred = $q.defer();
        var url = '';

        ThubanConfigService.get()
        .then(function(config) {
            url += config.httpURL;
            url += config.formService;
            url += ProcessFieldsStringService.createFieldValueString(fields);
            url += '&token=' + config.token;
            url += '&clase=' + config.requestClass;
            url += '&autoGenField=' + config.requestAutoGenField;
            url += '&backgroundImage=' + config.backgroundImage;

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

            xmlhttp.send();
        })
        .catch(function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

}
