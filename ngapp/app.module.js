const BASEURL = document.getElementById('base_url').value;
const APPURL = document.getElementById('app_url').value;
const VERSION = document.getElementById('version').value;
const COMURL = APPURL + 'common/';
const MASTERURL = APPURL + 'masterfile/';
const ADMINURL = APPURL + 'administrative/';
const TRANSURL = APPURL + 'transaction/';
const REPURL = APPURL + 'reports/';
const APIURL = '';
const PROJURL = '/weserve';
const CSSURL = '/weserve/assets/css/app.css';
const LOADING = document.getElementById('loading-screen');
// Default colors

angular
	.module('app', [
		'ui.router',
		'oc.lazyLoad',
		'angular-loading-bar',
		'ngSanitize',
		'ngIdle',
		'ngAnimate',
		'sharedMod',
		'ui.bootstrap',
		'ui.bootstrap.contextMenu',
		'ngAria',
		'ui.grid',
		'ui.grid.edit',
		'ui.grid.rowEdit',
		'ui.grid.cellNav',
		'ui.grid.selection',
		'ui.grid.resizeColumns',
		// 'ui.bootstrap.contextMenu',
		'ngMask',
		'toastr'
	])
	.config([
		'cfpLoadingBarProvider',
		'IdleProvider',
		function (cfpLoadingBarProvider, IdleProvider) {
			cfpLoadingBarProvider.includeSpinner = false;
			cfpLoadingBarProvider.latencyThreshold = 1;
			IdleProvider.idle(10);
			IdleProvider.timeout(600);
		},
	])
	.run([
		'$rootScope',
		'$state',
		'$stateParams',
		'Idle',
		'$ocLazyLoad',
		'$injector',
		'$location',
		function ($rootScope, $state, $stateParams, Idle, $ocLazyLoad, $injector, $location) {
			$ocLazyLoad
				.load([APPURL + 'app.service.js?v=' + VERSION,])
				.then(function (d) {
					// NotAllowedMenuSvc = $injector.get("NotAllowedMenuSvc");
					// role();
				});
			var notAllowedMenuList = [];
			function role() {
				NotAllowedMenuSvc.get({ disallowed: true })
					.then(function (response) {
						if (response.message) {
							notAllowedMenuList = [];
						} else {
							notAllowedMenuList = response;
						}
					})
			}
			Idle.watch();
			$rootScope.$on('IdleTimeout', function () {
				angular.element(document.getElementById('idle-page')).addClass('open');
			});
			$rootScope.$on("$locationChangeStart", function () {
				notAllowedMenuList.forEach(function (item) {
					if ($location.$$path === item.FormURL) {
						event.preventDefault();
						$location.path('/');
						angular.element(document.getElementById('page-not-allowed')).addClass('open');
					}
				});
			})
			$rootScope.$state = $state;
			return ($rootScope.$stateParams = $stateParams);
		},
	]);
