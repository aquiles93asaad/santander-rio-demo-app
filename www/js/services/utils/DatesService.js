"user strict";

angular.module('SantanderRioApp')

.service('DatesService', function() {

    /****************/
    /* PUBLIC METHODS
    /****************/
    return {
        getNowDate: getNowDate
    }

    /****************/
    /* PRIVATE METHODS
    /****************/
    function getNowDate() {
        var nowDate = new Date();
        
        var result = ('0' + nowDate.getDate()).slice(-2);
        result += '/' + ('0' + (nowDate.getMonth() + 1)).slice(-2);
        result += '/' + nowDate.getFullYear();

        return result;
    }
});
