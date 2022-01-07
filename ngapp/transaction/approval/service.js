(function () {
  "use strict";
  angular
    .module("app")
    .factory("ApprovalSvc", ApprovalSvc)

    ApprovalSvc.$inject = ["baseService"];

  function ApprovalSvc(baseService) {
    var service = new baseService();
    service.url = APIURL + "api/approval";
    return service;
  }
})();
