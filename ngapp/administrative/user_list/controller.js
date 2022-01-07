angular
    .module('app')

    .controller('UserListCtrl', UserListCtrl)
    .controller('ModalCtrl', ModalCtrl);

UserListCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', '$uibModal', '$filter'];
ModalCtrl.$inject = ["$scope", "$ocLazyLoad", "$injector", 'data', '$uibModalInstance', '$filter','$state'];

function UserListCtrl($scope, $ocLazyLoad, $injector, $uibModal, filter) {
    var vm = this;
    vm.variables = {};
    vm.users = [];
    vm.accessList = [];
    vm.userGrid = {
        enableRowSelection: true,
        enableCellEdit: false,
        enableColumnMenus: false,
        modifierKeysToMultiSelect: true,
        enableRowHeaderSelection: false,
        columnDefs: [
            // { name: 'ID', field: 'accnt_id' },
            { name: 'USERNAME', field: 'username' },
            { name: 'LASTNAME', field: 'lname' },
            { name: 'FIRSTNAME', field: 'fname' },
            { name: 'MIDDLENAME', field: 'mname' },
            { name: 'EMAIL', field: 'email_address' },
            { name: 'CONTACT', field: 'contact_num' },
        ],
        data: 'vm.user',
        onRegisterApi: function(gridApi) {
            gridApi.selection.on.rowSelectionChanged(null, function(row) {
                vm.user_clickRow(row.entity);
            });
        },
    }
    vm.user_clickRow = function(row) {
        row.level = '1';
        row.update = '1';
        vm.newUser(row);
    };
    vm.StaffuserGrid = {
        enableRowSelection: true,
        enableCellEdit: false,
        enableColumnMenus: false,
        modifierKeysToMultiSelect: true,
        enableRowHeaderSelection: false,
        columnDefs: [
            // { name: 'ID', field: 'accnt_id' },
            // { name: 'USERNAME', field: 'username' },
            { name: 'LASTNAME', field: 'lname' },
            { name: 'FIRSTNAME', field: 'fname' },
            { name: 'MIDDLENAME', field: 'mname' },
            // { name: 'EMAIL', field: 'email_address' },
            // { name: 'CONTACT', field: 'contact_num' },
        ],
        data: 'vm.Staffuser',
        onRegisterApi: function(gridApi) {
            gridApi.selection.on.rowSelectionChanged(null, function(row) {
                vm.staffuser_clickRow(row.entity);
            });
        },
    }
    vm.staffuser_clickRow = function(row) {
        // vm.serv = angular.copy(row);
        row.level = '3';
        row.update = '1';
        vm.newUser(row);
    };
    $ocLazyLoad
        .load([
            ADMINURL + 'user_list/service.js?v=' + VERSION, 
            APPURL + 'app.service.js?v=' + VERSION,
        ]).then(function(d) {
            UserListSvc = $injector.get("UserListSvc");
            AppSvc = $injector.get('AppSvc');
            // vm.getUsers();
            vm.getUserCredentials();
        });

        vm.getUserCredentials = function () {
            LOADING.classList.add("open");
            AppSvc.get().then(function (response) {
                if (response) {
                    vm.level = response.record.level;
                    if(vm.level == 1){
                        vm.getAdminData();
                    }else{
                        vm.getSalonData();
                    }
                } 
                console.log(vm.level);
            })
        };
        vm.getAdminData = function (){
            AppSvc.get({admindata:true}).then(function (response) {
                if (response) {
                    vm.username = response[0].username
                    vm.pic = response[0].profile_pic ? 'assets/images/profpic/'+response[0].profile_pic : 'assets/images/default.jpg';
                    // vm.getSalon();
                    vm.getUsers();
                } 
                LOADING.classList.remove("open");
            })
        };
    
        vm.getSalonData = function (){
            AppSvc.get({salondata:true}).then(function (response) {
                if (response) {
                    vm.profile = response[0];
                    vm.approved = response[0].is_approved;
                    vm.username = response[0].name;
                    vm.id_salon = response[0].salon_id;
                    // vm.pic = response[0].salon_profpic ? 'assets/images/salon/'+response[0].salon_profpic : 'assets/images/default.jpg';
                    vm.getSalonUsers();
                    
                } 
                LOADING.classList.remove("open");
            })
        };
        vm.getSalonUsers = function() {
            UserListSvc.get({salonuser:true,id:vm.id_salon}).then(function(response) {
                if (response.message) {
                    vm.salon_user = [];
                } else {
                    vm.salon_user = response;
                }
                vm.Staffuser = vm.salon_user;
            })
        }
    vm.getUsers = function() {
        UserListSvc.get().then(function(response) {
            if (response.message) {
                vm.user = [];
            } else {
                vm.user = response;
            }
        })
    }
    vm.newUser = function(x) {
        var options = {
            data:x,
            animation: true,
            templateUrl: ADMINURL + "user_list/modal.html?v=" + VERSION,
            controllerName: "ModalCtrl",
            viewSize: "lg",
            filesToLoad: [
                ADMINURL + "user_list/modal.html?v=" + VERSION,
                ADMINURL + "user_list/controller.js?v=" + VERSION
            ]
        };
        AppSvc.modal(options).then(function(data) {
            if (data) {
            }
        });
    }
    
}

function ModalCtrl($scope, $ocLazyLoad, $injector, data, $uibModalInstance, filter,$state) {
    var modal = this;
    modal.userList = [];
    modal.filtered = [];
    modal.variables = {};
    modal.variables = angular.copy(data);
    console.log(modal.variables);
    modal.variables.LastName = data.lname;
    modal.variables.FirstName = data.fname;
    modal.variables.MiddleName = data.mname;
    modal.variables.username = data.username;
    modal.variables.email = data.email_address;
    $ocLazyLoad
        .load([ADMINURL + 'user_list/service.js?v=' + VERSION, ]).then(function(d) {
            UserListSvc = $injector.get("UserListSvc");
        });
    modal.save = function (){
        var data = angular.copy(modal.variables);
        // data.userlistpost = true;
        UserListSvc.save(data).then(function(response) {
            if (response.success) {
                if (response.id) {
                    UserListSvc.showSwal('Success', response.message, 'success');
                }
                modal.close();
                UserListSvc.showSwal('Success', response.message, 'success');
            } else {
                UserListSvc.showSwal('Ooops', "Nothing has changed. Failed Saving", 'warning');
            }
        })
    }
    modal.DeleteUser = function (){
        alert('alert');
        var data = angular.copy(modal.variables);
        data.deleteuser = true;
        UserListSvc.save(data).then(function(response) {
            if (response.success) {
                modal.close();
                UserListSvc.showSwal('Success', response.message, 'success');
            } else {
                UserListSvc.showSwal('Ooops', "Nothing has changed. Failed Saving", 'warning');
            }
        })
    }
   
    modal.close = function() {
        $state.reload();
        $uibModalInstance.dismiss('cancel');
    }
}