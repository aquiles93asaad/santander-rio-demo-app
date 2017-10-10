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

    function createPdf(fields, solution) {
        var deferred = $q.defer();
        var url = '';

        ThubanConfigService.getConfig()
        .then(function(config) {
            url += config.general.httpURL;
            url += config.services.formService;
            url += '&clase=' + config.classes.requestClass;
            url += ProcessFieldsStringService.createFieldValueString(fields);
            url += '&autoGenField=' + config.templates[solution].autoGenField;
            url += '&backgroundImage=' + config.templates[solution].backgroundImage;
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

            xmlhttp.send();
        })
        .catch(function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

}
