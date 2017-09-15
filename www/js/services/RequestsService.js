"user strict";

angular.module('SantanderRioApp')

.service('RequestsService', RequestsService);

RequestsService.$inject = [
    '$q',
    'ThubanConfigService',
    'ThubanMainServices',
    'ThubanCreatePdfService',
    'ThubanSignPdfService',
    'DatesService',
    'FilesConverterService'
];

function RequestsService (
    $q,
    ThubanConfigService,
    ThubanMainServices,
    ThubanCreatePdfService,
    ThubanSignPdfService,
    DatesService,
    FilesConverterService
) {

    /******************/
    /* PUBLIC METHODS
    /*****************/

    return {
        newRequest: newRequest,
        updateRequest: updateRequest,
        getRequestFile: getRequestFile,
        newIdentificationDocument: newIdentificationDocument
    };

    /****************/
	/* PRIVATE METHODS
	/****************/

    function newRequest(data) {
        var deferred = $q.defer();

        var fields = [
            {key: 'N_DOCUMENTO', value: data.dni.dniNumber},
            {key: 'D_APELLIDO', value: data.dni.lastName},
            {key: 'D_NOMBRE', value: data.dni.name},
            {key: 'D_SEXO', value: data.dni.gender},
            {key: 'F_NACIMIENTO', value: data.dni.birthDate},
            {key: 'F_SOLICITUD', value: DatesService.getNowDate()},
            {key: 'ESTADO', value: 'OBSERVAR'},
            {key: 'D_PRODUCTO', value: data.product},
            {key: 'D_EMAIL', value: data.email},
            {key: 'D_DIRECCION', value: data.address},
            {key: 'D_CANALVENTA', value: 'Online'},
            {key: 'D_EJECUTIVO', value: 'Mobile Banking'},
            {key: 'D_NACIONALIDAD', value: 'Argentina'}
        ];

        ThubanCreatePdfService.createPdf(fields, "salesChannelSolution")
        .then(function(data) {
            deferred.resolve(data);
        })
        .catch(function(error)  {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function updateRequest(data, file, isBase64Encoded = false) {
        var deferred = $q.defer();

        var fields = [
            {key: 'ESTADO', value: 'Analisis de Riesgo'}
        ];

        var binaryFile = b64toBinary(file);

        ThubanSignPdfService.signPdf(data.requestId, fields, binaryFile, isBase64Encoded, "salesChannelSolution")
        .then(function(success) {
            deferred.resolve(success);
        })
        .catch(function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function getRequestFile(requestId) {
        var deferred = $q.defer();

        ThubanMainServices.getThubanResource(requestId)
        .then(function(file) {
            deferred.resolve(file);
        })
        .catch(function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function newIdentificationDocument(data, file, extension, isBase64Encoded = false) {
        var deferred = $q.defer();

        if(typeof file === "undefined") {
            deferred.reject("Error en RequestsService -> newIdentificationDocument: el parámetro file es obligatorio.");
            return deferred.promise;
        }

        if(typeof extension === "undefined") {
            deferred.reject("Error en RequestsService -> newIdentificationDocument: el parámetro extension es obligatorio.");
            return deferred.promise;
        }

        var fields = [
            {key: 'NRO_SOLICITUD', value: data.nroSolicitud},
            {key: 'N_DOCUMENTO', value: data.dniNumber},
            {key: 'D_APELLIDO', value: data.lastName},
            {key: 'D_NOMBRE', value: data.name},
            {key: 'F_DIGITALIZACION', value: DatesService.getNowDate()},
            {key: 'D_TIPOLOGIA', value: 'DNI'},
            {key: 'D_DIGITALIZADOR', value: 'Mobile App'}
        ];

        var binaryFile = FilesConverterService.base64ToBinary(file);

        ThubanConfigService.getClassesConfig()
        .then(function(classes) {
            return ThubanMainServices.createThubanItem(classes.documentClass, fields, binaryFile, extension, isBase64Encoded);
        })
        .then(function(data) {
            deferred.resolve(data);
        })
        .catch(function(error)  {
            deferred.reject(error);
        });

        return deferred.promise;
    }
}
