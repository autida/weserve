angular
.module('app')
.controller('AppCtrl', AppCtrl);

AppCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', '$state', '$window'];

function AppCtrl($scope, $ocLazyLoad, $injector, $state, $window) {
	var vm = this;
	vm.openMenu = '';
	vm.username = '';
	vm.showSide = true;
	var id_salon;
	var x;
	$ocLazyLoad.load([
		APPURL + 'app.service.js?v=' + VERSION,
		APPURL + "dashboard/service.js?v=" + VERSION
	]).then(function (d) {
		AppSvc = $injector.get('AppSvc');
		NotAllowedMenuSvc = $injector.get("NotAllowedMenuSvc");
		DashboardSvc = $injector.get("DashboardSvc");
		vm.getUserCredentials();
		vm.openMenu = $state.current.params.urlGroup;
	});
	vm.getUserCredentials = function () {
		LOADING.classList.add("open");
		AppSvc.get().then(function (response) {
			if (response) {
				// vm.username = response.record.user;
				vm.level = response.record.level;
				// vm.pic = response.record.pic ? 'assets/images/profpic/'+response.record.pic : 'assets/images/default.jpg';
				vm.getMenus();
				if(vm.level == 1){
					vm.getAdminData();
				}else{
					vm.getSalonData();
					// console.log('salon',vm.level);
				}
			} else {
				vm.logout();
			}
		})
	};
	vm.getAdminData = function (){
		AppSvc.get({admindata:true}).then(function (response) {
			if (response) {
				
				vm.username = response[0].username
				vm.pic = response[0].profile_pic ? 'assets/images/profpic/'+response[0].profile_pic : 'assets/images/default.jpg';
			} 
		})
	};

	vm.getSalonData = function (){
		AppSvc.get({salondata:true}).then(function (response) {
			if (response) {
				vm.username = response[0].name;
				vm.pic = response[0].salon_profpic ? 'assets/images/salon/'+response[0].salon_profpic : 'assets/images/default.jpg';
				id_salon = response[0].salon_id;
			} 
			vm.getSalon(id_salon);
		})
		
	};
	vm.getSalon = function(x) {
		var rate=0;
		var rating=0;
		var cnt = 0;
		vm.salon_rate =[];
		LOADING.classList.add("open");
		DashboardSvc.get({rating:true,id:x}).then(function(response) {
			if (response.message) {
				vm.starRating = 0;
			} else {
				console.log(response[0].rate);
				if(response.length < 1){
					vm.starRating = rate + parseInt(response[0].rate);
				}else{
					for($j=0;$j<response.length;$j++){
							rate = rate + parseInt(response[$j].rate);
							cnt++;
					}
					rating = rate/cnt;
					vm.starRating = parseInt(rating).toString();
				}
				
				vm.starRate = vm.starRating;
			}
			// vm.filteredsalon = vm.salon_list;
			console.log('salonfiltered',vm.starRate);
			// vm.salon_count = vm.filteredsalon.length;
			// vm.getSalonReview();
		})
	}

	vm.getSalonReview = function() {
		LOADING.classList.add("open");
		vm.filteredsalon = [];
		DashboardSvc.get({review:true}).then(function(response) {
			if (response.message) {
				vm.salon_review_list = [];
			} else {
				vm.salon_review_list = response;
			}
			vm.filteredsalonReview = vm.salon_review_list;
			var rating=0;
			var rate=0;
			var salonID;
			var cnt = 0;
			for($i=0;$i<vm.filteredsalon.length;$i++){
				for($j=0;$j<vm.filteredsalonReview.length;$j++){
					rating =0;
					if(vm.filteredsalon[$i].salon_id == vm.filteredsalonReview[$j].salon_id){
						salonID = $i;
						rate = rate + parseInt(vm.filteredsalonReview[$j].rate);
						console.log('rateni',rate);
						rating = 0;
						cnt++;
					}else{
						if(rate>=1){
							rating = rate/cnt;
							vm.filteredsalon[salonID].rate = parseInt(rating).toString();
						   rate = 0;
						   rating = 0;
						   cnt=0;
						}
					}
				   
				}
				console.log('rating',vm.filteredsalon[$i].rate);
			}
			console.log('filteredsa',vm.filteredsalon);
		   
			LOADING.classList.remove("open");
		})
	}

	vm.getMenus = function () {
		NotAllowedMenuSvc.get({ allowed: true }).then(function (response) {
			if (response.message) {
				vm.menuList = [];
			} else {
				var menuList = [];
				var menus = response.groupBy('FormGroup');
				for (var key in menus) {
					menuList.push({ group: key, value: menus[key] });
				};
				vm.menuList = menuList;
			}
			LOADING.classList.remove("open");
		})
	}
	vm.dashboard = function () {
		vm.openMenu = '';
	}
	// vm.calendar = function () {
	// 	vm.openMenu = '';
	// 	// alert('calendar ni langga');
	// }
	vm.openSubMenu = function (number) {
		var currentMenu = vm.openMenu;
		vm.openMenu = currentMenu === number ? '' : number;
	};
	vm.openSideMenu = function () {
		var body = angular.element(document.querySelector('body'));
		if (vm.showSide) {
			body.addClass('sidebar-mobile-show sidebar-hidden');
			vm.showSide = false;
		} else {
			body.removeClass('sidebar-mobile-show sidebar-hidden');
			vm.showSide = true;
		}
	};
	vm.okayButton = function (type) {
		if (type === 'idle') {
			$window.location.reload();
		} else {
			angular.element(document.getElementById('page-not-allowed')).removeClass('open');
		}

	}
	vm.logout = function () {
		window.location.href = PROJURL + '/login/logout';
	};
	Array.prototype.groupBy = function (prop) {
		return this.reduce(function (groups, item) {
			var val = item[prop];
			groups[val] = groups[val] || [];
			groups[val].push(item);
			return groups;
		}, {});
	};
}
