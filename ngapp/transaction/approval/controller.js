angular.module('app')
    .controller('ApprovalCtrl', ApprovalCtrl);

    ApprovalCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', '$uibModal', '$filter'];

function ApprovalCtrl($scope, $ocLazyLoad, $injector, $uibModal, filter) {
    var vm = this;
    vm.variables = {};
    vm.filtered = [];
    vm.countNotif = 0;

    $ocLazyLoad
        .load([TRANSURL + 'approval/service.js?v=' + VERSION,]).then(function (d) {
            ApprovalSvc = $injector.get("ApprovalSvc");
            vm.getRequestForApproval();
        });

    function pad(number, length) {
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }
    function getDate(inputDate) {
        var dt = new Date(inputDate);
        var dtString = dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate());
        return dtString;
    }

    vm.searching = function () {
        if (!vm.search) {
            return vm.filtered = vm.PropertyList;
        }
        return vm.filtered = filter('filter')(vm.PropertyList, { FullName: vm.search });
    }
    vm.getRequestForApproval = function (){
        ApprovalSvc.get().then(function(response) {
                if (response.message) {
                    vm.salon_list = [];
                } else {
                    vm.salon_list = response;
                }
                vm.filtered = vm.salon_list;
                vm.countNotif = vm.filtered.length;
            })
    }
    vm.openSalonProfile = function (x) {
        console.log(x);
        var data = {};
        if (x) {
            data.id = x;
            data.approval = true;
        }
        var options = {
            data: data,
            animation: true,
            templateUrl: MASTERURL + "salon/salon_profile.html?v=" + VERSION,
            controllerName: "SalonProfileCtrl",
            viewSize: "lg",
            filesToLoad: [
                MASTERURL + "salon/salon_profile.html?v=" + VERSION,
                MASTERURL + "salon/controller.js?v=" + VERSION
            ]
        };
        AppSvc.modal(options);
        vm.getRequestForApproval();
    }
   
}

