(function () {
	'use strict';
	angular
		.module('app')

		.factory('AppSvc', AppSvc)
		.factory('NotAllowedMenuSvc', NotAllowedMenuSvc)

	AppSvc.$inject = ['baseService'];
	NotAllowedMenuSvc.$inject = ['baseService'];

	function AppSvc(baseService) {
		var service = new baseService();
		service.url = APIURL + 'login/user';
		return service;
	}
	function NotAllowedMenuSvc(baseService) {
		var service = new baseService();
		service.url = APIURL + 'login/menu_not_allowed';
		return service;
	}
})();
