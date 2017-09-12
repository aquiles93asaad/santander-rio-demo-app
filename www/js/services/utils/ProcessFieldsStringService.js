"user strict";

angular.module('SantanderRioApp')

.service('ProcessFieldsStringService', function() {

    /****************/
    /* PUBLIC METHODS
    /****************/
    return {
        createFieldValueString: createFieldValueString,
        createShowFieldsString: createShowFieldsString,
        createCriteriaString: createCriteriaString
    }

    /****************/
    /* PRIVATE METHODS
    /****************/
    function createFieldValueString(fields) {
        var result = '&fields=';
        var i=0;

        for(i;i<fields.length; i++) {
            if(i != 0)
                result += '|';

            result += fields[i].key + '=' + fields[i].value;
        }

        return result;
    }

    function createShowFieldsString(fields) {
        var result = '&showFields=';
        var i=0;

        for(i;i<fields.length; i++) {
            if(i != 0)
                result += '%26';

            result += fields[i];
        }

        return result;
    }

    function createCriteriaString(criterias) {
        var result = '&criterias=';
        var i=0;

        return result;
    }
});
