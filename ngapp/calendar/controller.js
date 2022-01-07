//main.js
angular
    .module("app")
    .controller("DashboardCtrl", DashboardCtrl)
    .controller("MenuCtrl", MenuCtrl);

DashboardCtrl.$inject = ["$scope", "$ocLazyLoad", "$injector"];
MenuCtrl.$inject = ["$scope", "$ocLazyLoad", "$injector", "$state", "$filter"];

function DashboardCtrl($scope, $ocLazyLoad, $injector) {
    var vm = this;
    var filter = $injector.get("$filter");
    vm.title = "WESERVE Dashboard";
    vm.year = getYear(new Date());
    vm.monthYear = new Date(getDateMinusOne(new Date()));
    vm.monthYear2 = new Date();
    vm.salon_list = [];
    vm.variables = {};
    vm.client_num = 0;
    vm.service_prov_num = 0;
    vm.pending_request_num = 0;

    $ocLazyLoad
        .load([
            APPURL + "dashboard/service.js?v=" + VERSION,
            TRANSURL + 'approval/service.js?v=' + VERSION,
            APPURL + 'app.service.js?v=' + VERSION,
        ])
        .then(function(d) {
            DashboardSvc = $injector.get("DashboardSvc");
            ApprovalSvc = $injector.get("ApprovalSvc");
            AppSvc = $injector.get('AppSvc');
            vm.getSalon();
            vm.getRequestForApproval();
            vm.getUserCredentials();
        });

    function pad(number, length) {
        var str = "" + number;
        while (str.length < length) {
            str = "0" + str;
        }
        return str;
    }

    vm.getUserCredentials = function () {
		LOADING.classList.add("open");
		AppSvc.get().then(function (response) {
			if (response) {
				vm.level = response.record.level;
                console.log(vm.level);
			} 
		})
	};
    function getDate(inputDate) {
        var dt = new Date(inputDate);
        var dtString =
            dt.getFullYear() +
            "-" +
            pad(dt.getMonth() + 1, 2) +
            "-" +
            pad(dt.getDate(), 2);
        return dtString;
    }

    function getDateMinusOne(inputDate) {
        var dt = new Date(inputDate);
        var dtString =
            dt.getFullYear() +
            "-" +
            pad(dt.getMonth(), 2) +
            "-" +
            pad(dt.getDate(), 2);
        return dtString;
    }

    function getMonth(inputDate) {
        var dt = new Date(inputDate);
        var dtString = pad(dt.getMonth() + 1, 2)
        return dtString;
    }

    function getMonthWord(inputDate) {
        var dt = new Date(inputDate);
        var dtString = pad(dt.getMonth() + 1, 2);
        var array = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
        return array[parseInt(dtString) - 1];
    }

    function getYear(inputDate) {
        var dt = new Date(inputDate);
        var dtString = dt.getFullYear();
        return dtString;
    }

    vm.getData = function() {
        LOADING.classList.add("open");
        DashboardSvc.get({ type: "line", year: vm.year }).then(function(response) {
            if (!response.message) {
                vm.label1 = [];
                vm.data1 = [];
                angular.forEach(response, function(value, key) {
                    vm.label1.push(key);
                    vm.data1.push(value);
                });
            } else {
                vm.label1 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                vm.data1 = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
            }
            LOADING.classList.remove("open");
            vm.chart();
        });

        LOADING.classList.add("open");
        DashboardSvc.get({ type: "bar", year: vm.year }).then(function(response) {
            if (!response.message) {
                console.log(response);
                vm.label2 = [];
                vm.data2 = [];
                angular.forEach(response, function(value, key) {
                    vm.label2.push(key);
                    vm.data2.push(value);
                });
            } else {
                vm.label2 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                vm.data2 = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
            }
            LOADING.classList.remove("open");
            vm.chart2();
        });
    }
    vm.getRequestForApproval = function (){
        ApprovalSvc.get().then(function(response) {
                if (response.message) {
                    vm.salon_list = [];
                } else {
                    vm.salon_list = response;
                }
                vm.filtered = vm.salon_list;
                vm.pending_request_num = vm.filtered.length;
            })
    }
    vm.getSalon = function() {
        LOADING.classList.add("open");
        DashboardSvc.get().then(function(response) {
            if (response.message) {
                vm.salon_list = [];
            } else {
                vm.salon_list = response;
            }
            vm.filtered = vm.salon_list;
            vm.service_prov_num = vm.filtered.length;
            LOADING.classList.remove("open");
        })
    }
}

function MenuCtrl($scope, $ocLazyLoad, $injector, $state, filter) {
    var vm = this;
    var registry = $state.router.stateRegistry.states;
    vm.filtered = [];
    vm.menuList = [];
    vm.states = [];
    vm.variables = {};
    vm.menuGrid = {
        enableRowSelection: true,
        enableCellEdit: false,
        enableColumnMenus: false,
        modifierKeysToMultiSelect: true,
        enableRowHeaderSelection: false,
        enableHorizontalScrollbar: false,
        columnDefs: [
            { name: "Menu Name", field: "FormName" },
            { name: "Menu Group", field: "FormGroup" },
        ],
        data: "vm.filtered",
        onRegisterApi: function(gridApi) {
            gridApi.selection.on.rowSelectionChanged(null, function(row) {
                vm.gridClick(row.entity);
            });
        },
    };
    for (var key in registry) {
        if (registry[key].params.urlGroup) {
            vm.states.push({
                FormStates: registry[key].params.urlName.config.value,
                FormGroup: registry[key].params.urlGroup.config.value,
                FormName: registry[key].params.formName.config.value,
                FormLocation: key,
                FormURL: registry[key].self.url,
            });
        }
    }
    $ocLazyLoad
        .load([APPURL + "dashboard/service.js?v=" + VERSION])
        .then(function(d) {
            MenuSvc = $injector.get("MenuSvc");
            vm.getMenus();
        });
    vm.getMenus = function() {
        MenuSvc.get().then(function(response) {
            if (response.message) {
                vm.menuList = [];
            } else {
                vm.menuList = response;
            }
            vm.filtered = vm.menuList;
        });
    };
    vm.gridClick = function(row) {
        vm.variables = angular.copy(row);
        vm.variables.index = vm.menuList.indexOf(row);
    };
    vm.save = function() {
        if (!vm.variables.FormName) {
            return AppSvc.showSwal("Ooops", "Form Name is required", "warning");
        }
        LOADING.classList.add("open");
        var data = angular.copy(vm.variables);
        MenuSvc.save(data).then(function(response) {
            if (response.success) {
                if (response.id) {
                    vm.variables.FormID = response.id;
                    vm.menuList.push(vm.variables);
                } else {
                    vm.menuList.splice(vm.variables.index, 1, vm.variables);
                }
                vm.filtered = vm.menuList;
                vm.clearFunction();
                AppSvc.showSwal("Success", response.message, "success");
            } else {
                AppSvc.showSwal(
                    "Ooops",
                    "Nothing has changed. Failed Saving",
                    "warning"
                );
            }
            LOADING.classList.remove("open");
        });
    };
    vm.delete = function() {
        if (!vm.variables.FormID) {
            return AppSvc.showSwal(
                "Ooops",
                "Select Menu First to Proceed",
                "warning"
            );
        }
        MenuSvc.delete(vm.variables.FormID).then(function(response) {
            if (response.success) {
                vm.menuList.splice(vm.variables.index, 1);
                vm.filtered = vm.menuList;
                vm.clearFunction();
                LOADING.classList.remove("open");
                AppSvc.showSwal("Success", response.message, "success");
            } else {
                AppSvc.showSwal("Error", response.message, "error");
            }
        });
    };
    vm.clearFunction = function() {
        vm.variables = {};
    };
    vm.changeLocation = function() {
        var l = filter("filter")(
            vm.states, { FormStates: vm.variables.FormStates },
            true
        );
        vm.variables = angular.copy(l[0]);
        // console.log("gere");
    };
}