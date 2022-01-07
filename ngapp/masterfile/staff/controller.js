angular
    .module('app')

    .controller('StaffCtrl', StaffCtrl)
    .controller('ModalCtrl', ModalCtrl);

StaffCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', '$uibModal', '$filter'];
ModalCtrl.$inject = ["$scope", "$ocLazyLoad", "$injector", 'data', '$uibModalInstance', '$filter','$state'];

function StaffCtrl($scope, $ocLazyLoad, $injector, $uibModal, filter) {
    var vm = this;
    vm.variables = {};
    vm.users = [];
    vm.accessList = [];
    var id_salon;
    vm.staff = {};
    vm.df = {};
    vm.update = 'false';
    vm.fitererdsched = [];
    vm.filteredservice = [];
    vm.sched = {};
    vm.sched.time_in = new Date(1970, 0, 1, 14, 57, 0);
    vm.sched.time_out = new Date(1970, 0, 1, 14, 57, 0);
    vm.edit = 'false';
    vm.filteredStaffList =[];
    
    vm.staffGrid = {
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
            // { name: 'ID', field: 'accnt_id' },
            // { name: 'USERNAME', field: 'username' },
            { name: 'LASTNAME', field: 'lname' },
            { name: 'FIRSTNAME', field: 'fname' },
            // { name: 'MIDDLENAME', field: 'mname' },
            // { name: 'EMAIL', field: 'email_address' },
            { name: 'CONTACT', field: 'contact_number' },
        ],
        data: 'vm.filtered',
        onRegisterApi: function(gridApi) {
            gridApi.selection.on.rowSelectionChanged(null, function(row) {
                vm.clickRow(row.entity);
            });
        },
    }
    vm.staffListGrid = {
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
            // { name: 'ID', field: 'accnt_id' },
            { name: 'Firstname', field: 'fname',width: "13%"},
            { name: 'LastName', field: 'lname',width: "14%" },
            { name: 'Phone #', field: 'contact_number',width: "12%" },
            { name: 'Service', field: 'staffService',width: "21%" },
            { name: 'Day', field: 'staffSched',width: "21%" },
            { name: 'Time', field: 'staffTime',width: "20%" },
        ],
        data: 'vm.filteredStaffList',
        onRegisterApi: function(gridApi) {
            gridApi.selection.on.rowSelectionChanged(null, function(row) {
                vm.clickRow(row.entity);
            });
        },
    }
    vm.clickRow = function(row) {
        vm.staff = angular.copy(row);
        vm.update = 'true';
        vm.getAllSched();
        vm.getService();
        // vm.serv = {};
    };
    vm.schedGrid = {
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
            { name: 'DAY', field:'day_name'},
            { name: 'TIME-IN', field:'timein',cellFilter: 'date:\'hh:mm a\''},
            { name: 'TIME-OUT', field:'timeout', cellFilter: 'date:\'hh:mm a\''},
        ],
        data: 'vm.fitererdsched',
        onRegisterApi: function(gridApi) {
            gridApi.selection.on.rowSelectionChanged(null, function(row) {
                vm.clickRow2(row.entity);
            });
        },
    }
    vm.clickRow2 = function(row) {
        vm.sched = angular.copy(row);
        // vm.serv.serv_name = vm.serv.service_description;
        // vm.serv.serv_price = vm.serv.service_price;
        // vm.serv.update = 'true';
        console.log(vm.sched);

    };
    vm.staffserviceGrid = {
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
            { name: 'SERVICE', field:'service_description'},
            { name: 'PRICE', field:'service_price',cellFilter: 'number: 2', cellClass: 'text-right'}
        ],
        data: 'vm.filteredservice',
        onRegisterApi: function(gridApi) {
            gridApi.selection.on.rowSelectionChanged(null, function(row) {
                vm.serviceRow(row.entity);
            });
        },
    }
    vm.serviceRow = function(row) {
        vm.serv = angular.copy(row);
        // vm.serv.serv_name = vm.serv.service_description;
        // vm.serv.serv_price = vm.serv.service_price;
        // vm.serv.update = 'true';

    };
    $ocLazyLoad
        .load([
            MASTERURL + 'staff/service.js?v=' + VERSION,
            APPURL + 'app.service.js?v=' + VERSION, 
            MASTERURL + 'service/service.js?v=' + VERSION,
        ]).then(function(d) {
            StaffSvc = $injector.get("StaffSvc");
            AppSvc = $injector.get('AppSvc');
            ServiceSvc = $injector.get("ServiceSvc");
            vm.getUserCredentials();
            // vm.getUsers();
            vm.update ='false';
        });

    
    vm.newMember = function(){
        vm.update = 'false';
        vm.staff = {};
    }      
    function getTime(inputDate) {
		var dt = new Date(inputDate);
        if(dt.getHours() >11){
            var dtString =
			dt.getHours() +
			':' +
			dt.getMinutes() +
			':' +
			dt.getSeconds() ;
        }else{
            if(dt.getHours() >11){
                var dtString =
                dt.getHours() +
                ':' +
                dt.getMinutes() +
                ':' +
                dt.getSeconds();
            }
        }
		
		return dtString;
	}
    vm.addSched = function (){
        if(! vm.sched.day)
        return AppSvc.showSwal('Warning', "Select Day",'warning');
        if(! vm.sched.time_in)
        return AppSvc.showSwal('Warning', "Input Timein",'warning');
        if(! vm.sched.time_out)
        return AppSvc.showSwal('Warning', "Input Timeout",'warning');
        vm.sched.time_out = filter('date')(vm.sched.time_out, "h:mm a");
        vm.sched.time_in = filter('date')(vm.sched.time_in, "h:mm a");
        // vm.sched.time_in = getTime(vm.sched.time_in);
        // vm.sched.time_out = getTime(vm.sched.time_out);
        //  vm.sched.time_out = filter('vm.sched.time_out')(new Date(), 'h:mm a');
        //  vm.sched.time_in = filter("date")(new Date(), 'h:mm a');
        //  vm.sched.time_out =filter("date")(new Date(), 's');
         vm.sched.staff_id = vm.staff.staff_id;
         vm.sched.sched = true;
        //  console.log('sdf',vm.sched);
         StaffSvc.save(vm.sched).then(function(response) {
            if (response.success) {
                if (response.id) {
                    vm.sched.staff_id = response.id;
                    vm.sched= {};
                    // vm.update = 'false';
                }
                vm.getAllSched();
                // vm.getAllStaff();
                StaffSvc.showSwal('Success', response.message, 'success');
            } else {
                StaffSvc.showSwal('Success', 'Success', 'success');
                vm.getAllSched();
                // StaffSvc.showSwal('Ooops', response.message, 'warning');
            }
            // LOADING.classList.remove("open");
        })
        //  if(vm.sched){
        //      vm.fitererdsched.push(vm.sched);
        //      vm.sched = {};
        //  }else
        //  StaffSvc.showSwal('Erorr', "Complete schedule input.",'warning');
     }
     
     vm.getAllSched = function() {
        LOADING.classList.add("open");
        var data = {};
        data.id = id_salon;
        data.staff_id = vm.staff.staff_id;
        data.getAllSched = true;
        console.log('sched',data);
        vm.fitererdsched = [];
        StaffSvc.get(data).then(function(response) {
            if (response.message) {
                vm.fitererdsched = [];
                
                // vm.fitererdsched.timein = response.timein;
                // vm.fitererdsched.timeout = response.timeout;
                // vm.fitererdsched.day_name = response.day_name;
            }else{
              
                response.forEach(function(item) {
				    item.timein = item.timein;
                    item.timeout = item.timeout;
                    item.day_name = item.day_name;
                    vm.fitererdsched.push(item);
				});
            }
            // vm.fitererdsched = vm.sched;
           
            LOADING.classList.remove("open");
            console.log('sched',vm.fitererdsched);
        })
    }
   
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
                vm.getAllStaff();
                // console.log('sdafsa;,',id_salon);
            })
        };

    vm.getAllStaff = function() {
            LOADING.classList.add("open");
            var data = {};
            data.id = id_salon;
            data.getAllStaff = true;
            StaffSvc.get(data).then(function(response) {
                if (response) {
                    vm.staff = response;
                    // vm.staff.forEach(function(item) {
                    //     item.fullname = item.fname+" "+item.lname;
                    //     vm.staff.push(item);
                    // });
                }
                vm.StaffService();
                vm.StaffSchedule();
                vm.StaffTime();
                LOADING.classList.remove("open");
            })
        }

    vm.StaffService = function() {
        LOADING.classList.add("open");
        var data = {};
        data.salon_id = id_salon;
        // data.id = id_salon;
        data.StaffService = true;
        vm.filteredservice=[];
        vm.service_array = [];
        StaffSvc.get(data).then(function(response) {
            if (response.message) {
                vm.filteredservice = [];
            }else{
                var staff_id = response[0].staff_id;
                console.log(response.length);
                for($i=0;$i<response.length;$i++){
                        if(staff_id == response[$i].staff_id){
                            vm.service_array.push(response[$i].service_description);
                           var serv = vm.service_array.join(",");
                        }else{ 
                                if(serv){
                                    vm.filteredservice.push(serv);
                                    vm.service_array = [];
                                }
                                    vm.service_array.push(response[$i].service_description);
                                    var serv = vm.service_array.join(",");
                                    staff_id = response[$i].staff_id;
                                    // vm.filteredservice.push(serv);
                        }
                        
                }
                vm.filteredservice.push(serv);
                // response.forEach(function(item) {
                //     // item.staff_id =item.staff_id;
                   
                //     if(staff_id == item.staff_id){
                //         vm.service_array.push(item.service_description);
                //     }else{
                //         vm.filteredservice.push(item.service);
                //         vm.service_array = [];
                //         staff_id = item.staff_id;
                //         vm.service_array.push(item.service_description);
                //         item.service = vm.service_array.join(",");
                //         vm.service_array = [];
                //     }
                //     item.service = vm.service_array.join(",");
                    
                // });
                // vm.staff.service = vm.filteredservice;
              
            }
            
            // console.log('restp',vm.filteredservice,vm.staff);
            for($i=0;$i<vm.staff.length;$i++){
                vm.staff[$i].staffService = vm.filteredservice[$i];

            }
            console.log('restp',vm.filteredservice,vm.staff);
            LOADING.classList.remove("open");
        })
    }
    vm.StaffSchedule = function() {
        LOADING.classList.add("open");
        var data = {};
        data.salon_id = id_salon;
        // data.id = id_salon;
        data.AllSched = true;
        vm.filteredsched=[];
        vm.sched_array = [];
        // vm.time_array = [];
        StaffSvc.get(data).then(function(response) {
            if (response.message) {
                vm.filteredsched = [];
            }else{
                var staff_id = response[0].staff_id;
                console.log(response.length);
                // var day = filter('date')(response[$i].day_name, 'EEE');
                for($i=0;$i<response.length;$i++){
                        if(staff_id == response[$i].staff_id){
                            vm.sched_array.push(filter('date')(response[$i].day_name, ' '));
                            var sched = vm.sched_array.join(",");
                        }else{ 
                                if(sched){
                                    vm.filteredsched.push(sched);
                                    vm.sched_array = [];
                                }
                                    vm.sched_array.push(filter('date')(response[$i].day_name, 'EEE'));
                                    var sched = vm.sched_array.join(",");
                                    staff_id = response[$i].staff_id;
                        }
                        
                }
                vm.filteredsched.push(sched);
            }
            
            console.log('sched',vm.filteredsched);
            for($i=0;$i<vm.staff.length;$i++){
                vm.staff[$i].staffSched = vm.filteredsched[$i];

            }
            console.log('sched',vm.filteredsched,vm.staff);
            LOADING.classList.remove("open");
            // vm.filteredStaffList = vm.staff;
        })
    }
    vm.StaffTime = function() {
        LOADING.classList.add("open");
        var data = {};
        data.salon_id = id_salon;
        // data.id = id_salon;
        data.stafftime = true;
        vm.filteredtime=[];
        vm.time_array = [];
        // vm.time_array = [];
        StaffSvc.get(data).then(function(response) {
            if (response.message) {
                vm.filteredsched = [];
            }else{
                var staff_id = response[0].staff_id;
                console.log(response.length);
                for($i=0;$i<response.length;$i++){
                    var timein = filter('date')(response[$i].timein, "h:mm a");
                    var timeout = filter('date')(response[$i].timeout, "h:mm a");
                    console.log('time',timein,timeout);
                        if(staff_id == response[$i].staff_id){
                           
                            vm.time_array.push( timein +" - "+ timeout); 
                            var time = vm.time_array.join(",");
                            console.log(time);
                        }else{ 
                                if(time){
                                    vm.filteredtime.push(time);
                                    vm.time_array = [];
                                }
                                vm.time_array.push( timein +" - "+ timeout); 
                                var time = vm.time_array.join(",");
                                    staff_id = response[$i].staff_id;
                        }
                        
                }
                vm.filteredtime.push(time);
            }
            
            console.log('timeni',vm.filteredtime,timein);
            for($i=0;$i<vm.staff.length;$i++){
                vm.staff[$i].staffTime = vm.filteredtime[$i];

            }
            console.log('time',vm.filteredtime,vm.staff.StaffTime);
            LOADING.classList.remove("open");
            vm.filteredStaffList = vm.staff;
            vm.staff_count = vm.staff.length;
        })
    }
    vm.newStaffl = function(){
        document.getElementById("form");
    }

    vm.AddStaff = function (){
        // console.log(count(vm.fitererdsched));
        if(!vm.staff.fname)
            return AppSvc.showSwal('Erorr', "Input first name",'warning');
        if(!vm.staff.lname)
            return AppSvc.showSwal('Erorr', "Input last name",'warning');
        // if(vm.fitererdsched.length <1)
        //     return AppSvc.showSwal('Erorr', "Input atleast one schedule",'warning');
        // if(!vm.sched.time_in)
        //     return AppSvc.showSwal('Erorr', "Time-in could not be empty",'warning');
        // if(!vm.sched.time_out)
        //     return AppSvc.showSwal('Erorr', "Time-out could not be empty",'warning');
        // LOADING.classList.add("open");
        
        // var data = angular.copy(vm.staff);
        // data.staff_id = vm.staff.staff_id;
        var data = {};
        data.staff_id = vm.staff.staff_id;
        data.fname = vm.staff.fname;
        data.lname = vm.staff.lname;
        data.mname = vm.staff.mname;
        data.contact_number = vm.staff.contact_number;
        data.addstaff = true;
        data.salon_id = id_salon;
        // vm.staff.salon_id = id_salon;
        // vm.staff.addstaff = true;
        // data.service_price = vm.serv.serv_price;
        // console.log('adddfs',data);
        StaffSvc.save(data).then(function(response) {
            if (response.success) {
                if (response.id) {
                    vm.staff.staff_id = response.id;
                    vm.staff= {};
                    vm.update = 'false';
                }
                vm.getAllStaff();
                StaffSvc.showSwal('Success', response.message, 'success');
            } else {
                StaffSvc.showSwal('Ooops', response.message, 'warning');
            }
            console.log(response);
            // LOADING.classList.remove("open");
        })
    }
    // vm.addService = function (){
    //     console.log('abot')
    // }
    vm.Back = function (){
        vm.update = 'false';
        vm.staff = {};
    }
    vm.search_service = function (){
        var data = angular.copy(vm.serv);
        var options = {
            data: data,
            animation: true,
            templateUrl: MASTERURL + "staff/modal.html?v=" + VERSION,
            controllerName: "ModalCtrl",
            viewSize: "md",
            filesToLoad: [
                MASTERURL + "staff/modal.html?v=" + VERSION,
                MASTERURL + "staff/controller.js?v=" + VERSION,
            ],
        };
        AppSvc.modal(options).then(function(data) {
            if (data) {
                vm.serv = angular.copy(data);
                // console.log('datani',data);
                
                // vm.serv.service_description = data.service_description;
                // vm.serv.price = data.service_price;
                // vm.filteredservice.service_description = data.service_description;
                // vm.filteredservice.price = data.service_price;
                // vm.filteredservice.push(data);
                // console.log('datatbsni',vm.filteredservice);
            }
            
        });
    }
    vm.AddService = function (){
        if(!vm.serv.service_description)
            return AppSvc.showSwal('Warning', "Input service name",'warning');
        if(!vm.serv.service_price)
            return AppSvc.showSwal('Warning', "Input service price",'warning');

        LOADING.classList.add("open");
        var data = angular.copy(vm.serv);
        data.addStaffService = true;
        data.staff_id = vm.staff.staff_id;
        // data.service_price = vm.serv.serv_price;
        console.log('adddfs',data);
        StaffSvc.save(data).then(function(response) {
            // console.log('log',response);
            if (response.id) {
                ServiceSvc.showSwal('Success',response.message,"success");
                vm.getService();
                // vm.getAllStaff();
            } else {
                ServiceSvc.showSwal('Erorr',response.message,'warning');
                
                // vm.serv= {};
                // vm.serv.update = 'false';
            }
            LOADING.classList.remove("open");
        })
    }
    vm.getService = function() {
        LOADING.classList.add("open");
        var data = {};
        data.staff_id = vm.staff.staff_id;
        // data.id = id_salon;
        data.getStaffService = true;
        vm.filteredservice=[];
        StaffSvc.get(data).then(function(response) {
            console.log(response);
            if (response.message) {
                vm.filteredservice = [];
                // vm.service = response;
            }else{
                response.forEach(function(item) {
                    item.service_description = item.service_description;
                    item.price = item.service_price;
                    vm.filteredservice.push(item);
                });
            }
            // vm.filteredservice = vm.service;
            // console.log('service', vm.filteredservice);
            LOADING.classList.remove("open");
        })
    }
    vm.DeleteStaff = function(){
        var data = {};
        data.staff_id = vm.staff.staff_id; 
        data.deleteStaff = true;
        data.salon_id = id_salon;
        StaffSvc.save(data).then(function(response) {
            if (response.success) {
                
                vm.getAllStaff();
                vm.update = 'false';
                StaffSvc.showSwal('Success', response.message, 'success');
            } else {
                StaffSvc.showSwal('Ooops', response.message, 'warning');
            }
            console.log(response);
            // LOADING.classList.remove("open");
        })
    }
    vm.DeleteService = function(){
        var data = {};
        data.staff_id = vm.serv.staff_id; 
        data.service_id =  vm.serv.service_id;
        data.deleteStaffservice = true;
        // data.salon_id = id_salon;
        StaffSvc.save(data).then(function(response) {
            if (response.success) {
                vm.getService();
                // vm.getAllStaff();
                
                // vm.update = 'false';
                StaffSvc.showSwal('Success', response.message, 'success');
            } else {
                StaffSvc.showSwal('Ooops', response.message, 'warning');
            }
            console.log(response);
            // LOADING.classList.remove("open");
        })
    }
    vm.DeleteSchedule = function(){
        var data = {};
        data.staff_id = vm.sched.staff_id; 
        data.sched_id =  vm.sched.sched_id;
        data.deleteStaffsched = true;
        // data.salon_id = id_salon;
        StaffSvc.save(data).then(function(response) {
            if (response.success) {
                
               
                vm.getAllSched();
                // vm.getAllStaff();
                // vm.update = 'false';
                StaffSvc.showSwal('Success', response.message, 'success');
            } else {
                StaffSvc.showSwal('Ooops', response.message, 'warning');
            }
            console.log(response);
            // LOADING.classList.remove("open");
        })
    }
    
}

function ModalCtrl($scope, $ocLazyLoad, $injector, data, $uibModalInstance, filter,$state) {
    var modal = this;
    modal.userList = [];
    modal.filtered = [];
    modal.variables = {};
    modal.serviceGrid = {
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
        data: 'modal.filtered',
        onRegisterApi: function(gridApi) {
            gridApi.selection.on.rowSelectionChanged(null, function(row) {
                modal.clickRow(row.entity);
            });
        },
    }

   

    $ocLazyLoad
        .load([MASTERURL + 'service/service.js?v=' + VERSION,
        APPURL + "dashboard/service.js?v=" + VERSION,
        APPURL + 'app.service.js?v=' + VERSION,
         ]).then(function(d) {
            DashboardSvc = $injector.get("DashboardSvc");
            ServiceSvc = $injector.get("ServiceSvc");
            AppSvc = $injector.get('AppSvc');
            modal.getUserCredentials();
        });
        modal.getUserCredentials = function () {
            LOADING.classList.add("open");
            AppSvc.get().then(function (response) {
                if (response) {
                    modal.level = response.record.level;
                    if(modal.level == 1){
                        vm.getAdminData();
                    }else{
                        modal.getSalonData();
                    }
                } 
                
            })
        };
        modal.getAdminData = function (){
            AppSvc.get({admindata:true}).then(function (response) {
                if (response) {
                    
                    modal.username = response[0].username
                    modal.pic = response[0].profile_pic ? 'assets/images/profpic/'+response[0].profile_pic : 'assets/images/default.jpg';
                } 
            })
        };
    
        modal.getSalonData = function (){
            AppSvc.get({salondata:true}).then(function (response) {
                id_salon = response[0].salon_id;
                // vm.service.salon_id = response[0].salon_id;
                modal.getService(id_salon);
                // console.log('sdafsa;,',id_salon);
            })
        };
        modal.getService = function() {
            LOADING.classList.add("open");
            var data = {};
            data.id = id_salon;
            data.getAllService = true;
            console.log('gedst',data);
            ServiceSvc.get(data).then(function(response) {
                if (response) {
                    modal.service = response;
                   
                }
                modal.filtered = modal.service;
                // console.log(vm.filtered,"f")
                LOADING.classList.remove("open");
            })
        }
   
        modal.clickRow = function(row) {
            modal.serv = angular.copy(row);
            modal.serv.serv_name = modal.serv.service_description;
            modal.serv.serv_price = modal.serv.service_price;
            $uibModalInstance.close(row); 
        };
        // modal.clickRow2 = function (x) {
        //     modal.variablesdtl = angular.copy(x);
        //     modal.variablesdtl.index = modal.AcctGroupList.indexOf(x);
        //     $uibModalInstance.close(x); 
        // }
        modal.close = function() {
            $uibModalInstance.dismiss();
        }
}