"user strict";

angular.module('ThubanServices')

.service('ThubanMainServices', ThubanMainServices);

ThubanMainServices.$inject = [
    '$q',
    'ThubanConfigService',
    'ProcessFieldsStringService'
];

function ThubanMainServices(
    $q,
    ThubanConfigService,
    ProcessFieldsStringService
) {

    /******************/
    /* PUBLIC METHODS
    /*****************/

    return {
        createThubanItem: createThubanItem,
        updateThubanItem: updateThubanItem,
        searchThubanItems: searchThubanItems,
        getThubanResource: getThubanResource,
        deleteThubanResource: deleteThubanResource
    };

    /****************/
	/* PRIVATE METHODS
	/****************/

    /**
     * Método para crear un documento/item/registro en Thuban
     * @param Object fields: Los campos de la clase
     * @param String clase: Nombre de la clase documental en Thuban
     * @param Array[]/string file: El archivo si hay uno, en Binary o en Base64
     * @param String extension: Extensión del archivo a enviar
     * @param boolean isBase64Encoded: indica si el archivo está en base64 o no.
     * @return la respuesta del servicio.
     */
    function createThubanItem(clase, fields, file = null, extension = '', isBase64Encoded = false) {
        var deferred = $q.defer();

        if(typeof clase === "undefined") {
            deferred.reject("Error en ThubanMainServices -> createThubanItem: el parámetro clase es obligatorio.");
            return deferred.promise;
        }

        if(typeof fields === "undefined") {
            deferred.reject("Error en ThubanMainServices -> createThubanItem: el parámetro fields es obligatorio.");
            return deferred.promise;
        }

        var url = '';

        ThubanConfigService.getConfig()
        .then(function(config) {
            url += config.general.httpURL;
            url += config.services.documentService;
            url += '&clase=' + clase;
            url += ProcessFieldsStringService.createFieldValueString(fields);
            url += '&extension=' + extension;
            url += '&isBase64Encoded=' + isBase64Encoded;
            url += '&name=';
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

    /**
     * Método para actualizar los campos y/o el recurso de un documento/item/registro ya cargado en Thuban
     * @param String itemId: Id del documento/item/registro que se quiere actualizar
     * @param Object fields: Los campos de la clase
     * @param Array[]/string file: El archivo si hay uno, en Binary o en Base64
     * @param String extension: Extensión del archivo a enviar
     * @param boolean isBase64Encoded: indica si el archivo está en base64 o no.
     * @return la respuesta del servicio.
     */
    function updateThubanItem(itemId, fields = null, file = null, extension = '', isBase64Encoded = false) {
        var deferred = $q.defer();

        if(typeof itemId === "undefined") {
            deferred.reject("Error en ThubanMainServices -> updateThubanItem: el parámetro itemId es obligatorio.");
            return deferred.promise;
        }

        if(fields === null && file === null) {
            deferred.reject("Error en ThubanMainServices -> updateThubanItem: uno de los parámetros fields y file debe tener un valor distinto de nulo.");
            return deferred.promise;
        }

        var url = '';

        ThubanConfigService.getConfig()
        .then(function(config) {
            url += config.general.httpURL;
            url += config.services.resourceService;
            url += '&id=' + itemId;
            url += ProcessFieldsStringService.createFieldValueString(fields);
            url += '&extension=' + extension;
            url += '&isBase64Encoded=' + isBase64Encoded;
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

    /**
     * Método para crear un documento/item/registro en Thuban
     * @param String clase: Nombre de la clase documental en Thuban
     * @param Object showFields: Los campos a mostrar
     * @param Object criterias: Los criterios de búsqueda
     * @param boolean includeResources: indica si debe incluir información sobre el archivo físico asociado al documento
     * @return la respuesta del servicio.
     */
    function searchThubanItems(clase, showFields, criterias, includeResources = true) {
        var deferred = $q.defer();

        if(typeof clase === "undefined") {
            deferred.reject("Error en ThubanMainServices -> searchThubanItems: el parámetro clase es obligatorio.");
            return deferred.promise;
        }

        if(typeof showFields === "undefined") {
            deferred.reject("Error en ThubanMainServices -> searchThubanItems: el parámetro showFields es obligatorio.");
            return deferred.promise;
        }

        if(typeof criterias === "undefined") {
            deferred.reject("Error en ThubanMainServices -> searchThubanItems: el parámetro criterias es obligatorio.");
            return deferred.promise;
        }

        var url = '';

        ThubanConfigService.getConfig()
        .then(function(config) {
            url += config.general.httpURL;
            url += config.services.searchService;
            url += ProcessFieldsStringService.createShowFieldsString(showFields);
            url += ProcessFieldsStringService.createCriteriaString(criterias);
            url += '&token=' + config.general.token;

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', url, true);
            xmlhttp.setRequestHeader('Content-Type', 'application/octet-stream');

            xmlhttp.onreadystatechange = function () {
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    deferred.resolve(xmlhttp.response);
                } else if(xmlhttp.readyState == 4 && xmlhttp.status != 200){
                    deferred.reject(xmlhttp.response);
                }
            }
        })
        .catch(function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    /**
     * Método para buscar un recurso(archivo pdf, png, jpg, etc...) de un documento en Thuban
     * @param String itemId: id del documento
     * @return la respuesta del servicio.
     */
    function getThubanResource(itemId) {
        var deferred = $q.defer();

        if(typeof itemId === "undefined") {
            deferred.reject("Error en ThubanMainServices -> getThubanResource: el parámetro itemId es obligatorio.");
            return deferred.promise;
        }

        var url = '';

        ThubanConfigService.getConfig()
        .then(function(config) {
            url += config.general.httpURL;
            url += config.services.resourceService;
            url += '&method=getresource';
            url += '&id=' + itemId;
            url += '&token=' + config.general.token;

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', url, true);
            xmlhttp.setRequestHeader('Content-Type', 'application/octet-stream');
            xmlhttp.responseType = 'arraybuffer';

            xmlhttp.onreadystatechange = function () {
                if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var file = new Blob([new Uint8Array(xmlhttp.response)], {type: 'application/pdf'});
                    deferred.resolve(file);
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

    /**
     * Método para eliminar un recurso(archivo pdf, png, jpg, etc...) de un documento en Thuban
     * @param String itemId: id del documento
     * @return la respuesta del servicio.
     */
    function deleteThubanResource(itemId) {
        var deferred = $q.defer();

        if(typeof itemId === "undefined") {
            deferred.reject("Error en ThubanMainServices -> deleteThubanResource: el parámetro itemId es obligatorio.");
            return deferred.promise;
        }

        var url = '';

        ThubanConfigService.getConfig()
        .then(function(config) {
            url += config.general.httpURL;
            url += config.services.resourceService;
            url += '&method=deleteresource';
            url += '&id=' + itemId;
            url += '&token=' + config.general.token;

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', url, true);
            xmlhttp.setRequestHeader('Content-Type', 'application/octet-stream');
            xmlhttp.responseType = 'arraybuffer';

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
