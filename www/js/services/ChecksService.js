"user strict";

angular.module('SantanderRioApp')

.service('ChecksService', ChecksService);

ChecksService.$inject = [
    '$q',
    'ThubanConfigService',
    'ThubanMainServices',
    'ThubanCreatePdfService',
    'ThubanSignPdfService'
];

function ChecksService (
    $q,
    ThubanConfigService,
    ThubanMainServices,
    ThubanCreatePdfService,
    ThubanSignPdfService
) {

    /******************/
    /* PUBLIC METHODS
    /*****************/

    return {
        newRequest: newRequest,
        updateRequest: updateRequest,
        getRequestFile: getRequestFile,
        newDocument: newDocument
    };

    /****************/
	/* PRIVATE METHODS
	/****************/

    function newRequest(data) {
        var deferred = $q.defer();

        var dniInfo = processDniInfo(data.dni);

        var fields = [
            {key: 'N_DOCUMENTO', value: dniInfo.number},
            {key: 'D_APELLIDO', value: dniInfo.lastName},
            {key: 'D_NOMBRE', value: dniInfo.name},
            {key: 'D_SEXO', value: dniInfo.gender},
            {key: 'F_NACIMIENTO', value: dniInfo.date},
            {key: 'F_SOLICITUD', value: getNowDate()},
            {key: 'ESTADO', value: 'OBSERVAR'},
            {key: 'D_PRODUCTO', value: data.product},
            {key: 'D_EMAIL', value: data.email},
            {key: 'D_DIRECCION', value: data.address},
            {key: 'D_CANALVENTA', value: 'Online'},
            {key: 'D_EJECUTIVO', value: 'Mobile Banking'},
            {key: 'D_NACIONALIDAD', value: 'Argentina'}
        ];

        ThubanHttpServices.createThubanItem(fields)
        .then(function(data) {
            deferred.resolve(data);
        })
        .catch(function(error)  {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function updateRequest(data, file = null, isBase64Encoded = false) {
        var deferred = $q.defer();

        var fields = [
            {key: 'ESTADO', value: 'Analisis de Riesgo'}
        ];

        var binaryFile = null;

        if(file)
            binaryFile = b64toBinary(file);

        ThubanHttpServices.updateThubanItem(data.docId, fields, binaryFile, isBase64Encoded)
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function getRequestFile(docId) {
        var deferred = $q.defer();

        ThubanHttpServices.getThubanResource(docId)
        .then(function(file) {
            deferred.resolve(file);
        })
        .catch(function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function newIdentificationDocument(data, file = null, extension = '', isBase64Encoded = false) {
        var deferred = $q.defer();

        var dniInfo = processDniInfo(data.dni);

        var fields = [
            {key: 'NRO_SOLICITUD', value: data.nroSolicitud},
            {key: 'N_DOCUMENTO', value: data.dni},
            {key: 'D_APELLIDO', value: data.lastName},
            {key: 'D_NOMBRE', value: data.name},
            {key: 'F_DIGITALIZACION', value: getNowDate()},
            {key: 'D_TIPOLOGIA', value: 'DNI'},
            {key: 'D_DIGITALIZADOR', value: 'Mobile App'}
        ];

        var binaryFile = null;

        if(file)
            binaryFile = b64toBinary(file);

        ThubanHttpServices.createThubanItem(fields, binaryFile, extension, isBase64Encoded)
        .then(function(data) {
            deferred.resolve(data);
        })
        .catch(function(error)  {
            deferred.reject(error);
        });

        return deferred.promise;
    }
}
