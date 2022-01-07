(function() {
    'use strict';
    angular
        .module('app')

    .factory('DashboardSvc', DashboardSvc)
        .factory('MenuSvc', MenuSvc)

    DashboardSvc.$inject = ['baseService'];
    MenuSvc.$inject = ['baseService'];

    function DashboardSvc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/dashboard';
        return service;
    }

    function MenuSvc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/menu_list';
        return service;
    }
})();