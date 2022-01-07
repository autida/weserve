(function () {
  "use strict";
  angular
    .module("app")
    .factory("ServiceSvc", ServiceSvc)

  ServiceSvc.$inject = ["baseService"];


  function ServiceSvc(baseService) {
    var service = new baseService();
    service.url = APIURL + "api/service_sal";
    return service;
  }
})();
