"user strict";

angular.module('SantanderRioApp')

.service('ProcessDniInfoService', function() {

    /****************/
    /* PUBLIC METHODS
    /****************/
    return {
        getInfo: getInfo
    }

    /****************/
    /* PRIVATE METHODS
    /****************/
    function getInfo(dniInfo) {
        var result = {
            nro_tramite: null,
            lastName: null,
            name: null,
            gender: null,
            dniNumber: null,
            exemplary: null,
            birthDate: null,
            issueDate:  null,
            cuil: null
        }

        if(dniInfo.length == 8 || dniInfo.length == 9) {
            result.nro_tramite = dniInfo[0];
            result.lastName = dniInfo[1];
            result.name = dniInfo[2];
            result.gender = (dniInfo[3] == "M") ? "Masculino":"Femenino";
            result.dniNumber = dniInfo[4];
            result.exemplary = dniInfo[5];
            result.birthDate = dniInfo[6];
            result.issueDate = dniInfo[7];

            if(dniInfo[8]) {
                result.cuil = getCuil(result.dniNumber, dniInfo[8]);
            }
        } else {
            result.nro_tramite = dniInfo[10];
            result.lastName = dniInfo[4];
            result.name = dniInfo[5];
            result.gender = (dniInfo[8] == "M") ? "Masuculino":"Femenino";
            result.dniNumber = dniInfo[1].trim();
            result.exemplary = dniInfo[2];
            result.birthDate = dniInfo[7];
            result.issueDate = dniInfo[9];
        }

        return result;
    }

    function getCuil(dni, cuil) {
        var cuilNumbers = cuil.split('');
        return cuil[0] + cuil[1] + '-' + dni + '-' + cuil[2];
    }
});
