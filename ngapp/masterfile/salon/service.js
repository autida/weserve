(function () {
  "use strict";
  angular
    .module("app")
    .factory("SalonProfileSvc", SalonProfileSvc)
    .factory("MemberSvc", MemberSvc)
   

  SalonProfileSvc.$inject = ["baseService"];
  MemberSvc.$inject = ["baseService"];


  function SalonProfileSvc(baseService) {
    var service = new baseService();
    service.url = APIURL + "api/salon";
    return service;
  }

  function MemberSvc(baseService) {
    var service = new baseService();
    service.url = APIURL + "api/member_list";
    return service;
  }
})();
