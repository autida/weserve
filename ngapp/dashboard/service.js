(function() {
    'use strict';
    angular
        .module('app')

        .factory('DashboardSvc', DashboardSvc)
        .factory('CalendarSvc', CalendarSvc)
        .factory('ProfSvc', ProfSvc)
        .factory('BpermitSvc', BpermitSvc)
        .factory('AppointmentDashSvc', AppointmentDashSvc)

    DashboardSvc.$inject = ['baseService'];
    CalendarSvc.$inject = ['baseService'];
    ProfSvc.$inject = ['baseService'];
    BpermitSvc.$inject = ['baseService'];
    AppointmentDashSvc.$inject = ['baseService'];

    function DashboardSvc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/dashboard';
        return service;
    }
    function AppointmentDashSvc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/dashboard/appointment';
        return service;
    }
    function CalendarSvc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/calendar';
        return service;
    }
    function ProfSvc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/salon/profile';
        return service;
    }
    function BpermitSvc(baseService) {
        var service = new baseService();
        service.url = APIURL + 'api/salon/bpermit';
        return service;
    }
})();