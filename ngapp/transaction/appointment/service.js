(function () {
  "use strict";
  angular
    .module("app")
    .factory("AppointmentSvc", AppointmentSvc)

    AppointmentSvc.$inject = ["baseService"];

  function AppointmentSvc(baseService) {
    var service = new baseService();
    service.url = APIURL + "api/appointment";
    return service;
  }
})();
