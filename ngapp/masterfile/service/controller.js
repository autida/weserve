
angular.module('app')
    .controller('ServiceCtrl', ServiceCtrl)
    
ServiceCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', '$uibModal', '$filter'];


function ServiceCtrl($scope, $ocLazyLoad, $injector, $uibModal, filter) {
    var vm = this;
    vm.MemberList = [];
    vm.filtered = [];
    vm.filtered_services = {};
    vm.variables = {};
    vm.variablesdtl = {};
    vm.salon_count = 0;
    vm.rec = {};
    vm.serv = {};
    vm.serv.update = 'false';
    var id_salon;
    vm.service = {};
    vm.serviceGrid = {
        // enableCellEdit: false,
        // enableColumnMenus: false,
        // modifierKeysToMultiSelect: false,
        // enableHorizontalScrollbar: false,
        enableRowSelection: true,
        enableCellEdit: false,
        enableColumnMenus: false,
        modifierKeysToMultiSelect: true,
        enableRowHeaderSelection: false,
        columnDefs: [
            // { name: 'ID', field:'service_id' },
            { name: 'SERVICE', field:'service_description' },
            { name: 'PRICE', field:'service_price' },
        ],
        data: 'vm.filtered',
        onRegisterApi: function(gridApi) {
            gridApi.selection.on.rowSelectionChanged(null, function(row) {
                vm.clickRow(row.entity);
            });
        },
    }

    vm.clickRow = function(row) {
        vm.serv = angular.copy(row);
        vm.serv.serv_name = vm.serv.service_description;
        vm.serv.serv_price = vm.serv.service_price;
        vm.serv.update = 'true';

    };

    $ocLazyLoad
        .load([MASTERURL + 'service/service.js?v=' + VERSION,
        APPURL + "dashboard/service.js?v=" + VERSION,
        APPURL + 'app.service.js?v=' + VERSION,
         ]).then(function(d) {
            DashboardSvc = $injector.get("DashboardSvc");
            ServiceSvc = $injector.get("ServiceSvc");
            AppSvc = $injector.get('AppSvc');
            vm.getUserCredentials();
            // vm.getService();
            vm.serv.update = 'false';
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
                id_salon = response[0].salon_id;
                // vm.service.salon_id = response[0].salon_id;
                vm.getService(id_salon);
                // console.log('sdafsa;,',id_salon);
            })
        };
        vm.getService = function() {
            LOADING.classList.add("open");
            var data = {};
            data.id = id_salon;
            data.getAllService = true;
            console.log('gedst',data);
            ServiceSvc.get(data).then(function(response) {
                if (response) {
                    vm.service = response;
                   
                }
                vm.filtered = vm.service;
                // console.log(vm.filtered,"f")
                LOADING.classList.remove("open");
            })
        }
        
        vm.AddService = function (){
            if(!vm.serv.serv_name)
                return AppSvc.showSwal('Erorr', "Input service name",'warning');
            if(!vm.serv.serv_price)
                return AppSvc.showSwal('Erorr', "Input service price",'warning');

            LOADING.classList.add("open");
            var data = angular.copy(vm.serv);
            data.addService = true;
            data.salon_id = id_salon;
            // data.service_price = vm.serv.serv_price;
            console.log('adddfs',data);
            ServiceSvc.save(data).then(function(response) {
                // console.log('log',response);
                if (response.success) {
                    if(response.id){
                        ServiceSvc.showSwal('Success',response.message,"success");
                    }
                    ServiceSvc.showSwal('Success',response.message,"success");
                    vm.getService();
                    vm.serv= {};
                    vm.serv.update = 'false';
                } else {
                    ServiceSvc.showSwal('Erorr', response.message,'warning');
                }
                LOADING.classList.remove("open");
            })
        }
        vm.Back = function (){
            vm.serv.update = 'false';
            vm.serv.serv_name = '';
            vm.serv.serv_price = '';
        }
        vm.DeleteService = function(){
            var data = {};
            // data.staff_id = vm.serv.serv_name; 
            // data.service_id =  vm.serv.service_id;
            // data.serv_name = vm.serv.serv_name;
            // data.serv_price = vm.serv.serv_price;
            var data = angular.copy(vm.serv);
            data.deleteservice = true;
            data.salon_id = id_salon;
            ServiceSvc.save(data).then(function(response) {
                if (response.message) {
                    return ServiceSvc.showSwal('Ooops', 'Failed to delete.', 'warning');
                } else {
                    vm.serv ={};
                    vm.getService();
                   return ServiceSvc.showSwal('Success', 'Successfully deleted.', 'success');
                    
                };
            })
        }
    
    
   
}

