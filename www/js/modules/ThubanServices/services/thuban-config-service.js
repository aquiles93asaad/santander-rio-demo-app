"use strict";

angular.module('ThubanServices')

.service('ThubanConfigService', ThubanConfigService);

ThubanConfigService.$inject = ['localStorageService', '$q'];

function ThubanConfigService(localStorageService, $q) {

    /******************/
    /* PUBLIC METHODS
    /*****************/

    return {
        getConfig: getConfig,
        setConfig: setConfig,
        getGeneralConfig: getGeneralConfig,
        getClassesConfig: getClassesConfig,
        getServicesConfig: getServicesConfig,
        getTemplatesConfig: getTemplatesConfig,
        initializeConfig: initializeConfig
    }

    /****************/
	/* PRIVATE METHODS
	/****************/

    function getConfig() {
        var deferred = $q.defer();

        try{
            var config = {
                general: {
                    httpURL: localStorageService.get('httpURL'),
                    token: localStorageService.get('token'),
                    microblinkLicense: localStorageService.get('microblinkLicense')
                },
                classes: {
                    documentClass: localStorageService.get('documentClass'),
                    requestClass: localStorageService.get('requestClass'),
                    bankClass: localStorageService.get('bankClass'),
                    checkClass: localStorageService.get('checkClass'),
                    clientClass: localStorageService.get('clientClass'),
                    accountClientClass: localStorageService.get('accountClientClass'),
                    endorsementClass: localStorageService.get('endorsementClass')
                },
                services: {
                    documentService: localStorageService.get('documentService'),
                    resourceService: localStorageService.get('resourceService'),
                    searchService: localStorageService.get('searchService'),
                    formService: localStorageService.get('formService'),
                    signService: localStorageService.get('signService')
                },
                templates: {
                    salesChannelSolution: {
                        backgroundImage: localStorageService.get('salesChannelBackgroundImage'),
                        signatureImageSize: localStorageService.get('salesChannelSignatureImageSize'),
                        signatureXPos: localStorageService.get('salesChannelSignatureXPos'),
                        signatureYPos: localStorageService.get('salesChannelSignatureYPos'),
                        autoGenField: localStorageService.get('salesChannelAutoGenField')
                    },
                    checksSolution: {
                        backgroundImage: localStorageService.get('checksBackgroundImage'),
                        signatureImageSize: localStorageService.get('checksSignatureImageSize'),
                        signatureXPos: localStorageService.get('checksSignatureXPos'),
                        signatureYPos: localStorageService.get('checksSignatureYPos'),
                        autoGenField: localStorageService.get('checksAutoGenField')
                    }
                }
            };

            deferred.resolve(config);
        } catch (error) {
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function setConfig(config) {
        var deferred = $q.defer();

        try{
            if(typeof config === 'object') {

                angular.forEach(config, function(value, key) {
                    if(config.hasOwnProperty(key)) {
                        localStorageService.set(key, value);
                    }
                });

                deferred.resolve();
            } else {
                throw 'El párametro pasado debe ser un objeto.';
            }
        } catch (error) {
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function getGeneralConfig() {
        var deferred = $q.defer();

        try {
            var config = {
                httpURL: localStorageService.get('httpURL'),
                token: localStorageService.get('token'),
                microblinkLicense: localStorageService.get('microblinkLicense')
            };

            deferred.resolve(config);
        } catch (error) {
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function getClassesConfig() {
        var deferred = $q.defer();

        try {
            var config = {
                documentClass: localStorageService.get('documentClass'),
                requestClass: localStorageService.get('requestClass'),
                bankClass: localStorageService.get('bankClass'),
                checkClass: localStorageService.get('checkClass'),
                clientClass: localStorageService.get('clientClass'),
                accountClientClass: localStorageService.get('accountClientClass'),
                endorsementClass: localStorageService.get('endorsementClass')
            };

            deferred.resolve(config);
        } catch (error) {
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function getServicesConfig() {
        var deferred = $q.defer();

        try {
            var config = {
                documentService: localStorageService.get('documentService'),
                resourceService: localStorageService.get('resourceService'),
                searchService: localStorageService.get('searchService'),
                formService: localStorageService.get('formService'),
                signService: localStorageService.get('signService')
            };

            deferred.resolve(config);
        } catch (error) {
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function getTemplatesConfig() {
        var deferred = $q.defer();

        try {
            var config = {
                salesChannelSolution: {
                    backgroundImage: localStorageService.get('salesChannelBackgroundImage'),
                    signatureImageSize: localStorageService.get('salesChannelSignatureImageSize'),
                    signatureXPos: localStorageService.get('salesChannelSignatureXPos'),
                    signatureYPos: localStorageService.get('salesChannelSignatureYPos')
                },
                checksSolution: {
                    backgroundImage: localStorageService.get('checksBackgroundImage'),
                    signatureImageSize: localStorageService.get('checksSignatureImageSize'),
                    signatureXPos: localStorageService.get('checksSignatureXPos'),
                    signatureYPos: localStorageService.get('checksSignatureYPos')
                }
            };

            deferred.resolve(config);
        } catch (error) {
            deferred.reject(error);
        }

        return deferred.promise;
    }

    function initializeConfig() {
        var deferred = $q.defer();

        try {
            var config = {
                httpURL: 'http://demos:98/thuban-web/',
                token: 'xOir4xDkMmsRoWiGFgGdubZZUXOMaJThA1dnL4ELZj8=',
                microblinkLicense: 'UT7RE2YZ-5RMLRMOG-TQNXWQ7E-IJMK75MN-MSO2VZZF-UROEBE57-CFTHCDYB-K6GTL3IA',
                documentClass: 'SR_DOCUMENTO',
                requestClass: 'SR_SOLICITUD',
                bankClass: 'BANCO',
                checkClass: 'CHEQUE',
                clientClass: 'CLIENTE',
                accountClientClass: 'CUENTA_CLIENTE',
                endorsementClass: 'ENDOSO',
                documentService: 'http-services?service=documentService',
                resourceService: 'http-services?service=resourceService',
                searchService: 'http-services/searchService?service=searchService',
                formService: 'mobile-services?service=formService',
                signService: 'mobile-services?service=firmarSolicitud',
                salesChannelBackgroundImage: 'C:\\\\DocTemplateImages\\\\SolicitudSantander.png',
                salesChannelSignatureImageSize: '150',
                salesChannelSignatureXPos: '40',
                salesChannelSignatureYPos: '170',
                salesChannelAutoGenField: 'NRO_SOLICITUD',
                checksBackgroundImage: 'C:\\\\DocTemplateImages\\\\SolicitudSantander.png',
                checksSignatureImageSize: '150',
                checksSignatureXPos: '40',
                checksSignatureYPos: '170'
            };

            var configToSet = {};

            angular.forEach(config, function(value, key) {
                if(config.hasOwnProperty(key)) {
                    if(localStorageService.get(key) === null) {
                        configToSet[key] = value;
                    }
                }
            });

            setConfig(configToSet)
            .then(function() {
                deferred.resolve();
            })
            .catch(function(error) {
                deferred.reject(error);
            });
        } catch (error) {
            deferred.reject(error);
        }

        return deferred.promise;
    }
}
