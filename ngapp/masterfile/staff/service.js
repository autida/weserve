(function () {
    'use strict';
    angular
        .module('app')

        .factory('StaffSvc', StaffSvc)

    StaffSvc.$inject = ['baseService'];

    function StaffSvc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/staff';
        return service;
    }
})();
