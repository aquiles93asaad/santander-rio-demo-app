"user strict";

angular.module('SantanderRioApp')

.factory('UsersService', UsersService);

UsersService.$inject = ['$q'];

/* @ngInject */
function UsersService($q) {
    var users = [
        {id: 1, username: 'admin', password: 'admin', email: 'admin@admin.com'}
    ];

    var service = {
        getUserById: getUserById,
        addUser: addUser,
        login: login
    };

    return service;

    function login(data) {
        var deferred = $q.defer();

        var result = $.grep(users, function(user) {
            return ( user.username === data.username && user.password === data.password );
        });

        setTimeout(function() {
            if(result.length != 0)
                deferred.resolve(result[0]);
            else
                deferred.reject('Usuario y/o contraseña incorrectos.');
        }, 250);

        return deferred.promise;
    }

    function getUserById(id) {
        var deferred = $q.defer();

        var result = $.grep(users, function(user) {
            return ( user.id === id );
        });

        setTimeout(function() {
            if(result.length != 0)
                deferred.resolve(result[0]);
            else
                deferred.reject('No se encuentra el usuario.');
        }, 250);

        return deferred.promise;
    }

    function addUser(user) {
        var deferred = $q.defer();

        var oldLen = users.length;
        user['id'] = oldLen + 1;
        var newLen = users.push(user);

        setTimeout(function() {
            if(newLen > oldLen)
                deferred.resolve('Se agregó el usuario correctament.');
            else
                deferred.reject('No se pudo agregar el usuario.');
        }, 250);

        return deferred.promise;
    }
}
