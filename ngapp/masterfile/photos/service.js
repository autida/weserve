(function () {
  "use strict";
  angular
    .module("app")
    
    .factory("GallerySvc", GallerySvc)
   

  GallerySvc.$inject = ["baseService"];



  function GallerySvc(baseService) {
    var service = new baseService();
    service.url = APIURL + "api/gallery";
    return service;
  }
})();
