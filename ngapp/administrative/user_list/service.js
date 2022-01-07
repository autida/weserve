(function () {
    'use strict';
    angular
        .module('app')

        .factory('UserListSvc', UserListSvc)

    UserListSvc.$inject = ['baseService'];

    function UserListSvc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/user_list';
        return service;
    }
})();
