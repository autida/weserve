// const { data } = require("jquery");

// const { data } = require("jquery");

angular.module('app')
    .controller('AppointmentCtrl', AppointmentCtrl)
    .controller('CommentCtrl', CommentCtrl);

    AppointmentCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', '$uibModal', '$filter','$state'];
    CommentCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', 'data', '$uibModalInstance', '$filter','$uibModal','$state'];

function AppointmentCtrl($scope, $ocLazyLoad, $injector, $uibModal, filter,$state) {
    var vm = this;
    vm.variables = {};
    vm.filtered = [];
    vm.countNotif = 0;

    $ocLazyLoad
        .load([
            TRANSURL + 'appointment/service.js?v=' + VERSION,
            // APPURL + "dashboard/service.js?v=" + VERSION,
            APPURL + 'app.service.js?v=' + VERSION,
        ]).then(function (d) {
            AppointmentSvc = $injector.get("AppointmentSvc");
            // DashboardSvc = $injector.get("DashboardSvc");
            AppSvc = $injector.get('AppSvc');
           
            vm.getUserCredentials();
           
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
                vm.getSalon();
                vm.getRequestForApproval();
            } 
		})
	};

	vm.getSalonData = function (){
		AppSvc.get({salondata:true}).then(function (response) {
			if (response) {
                vm.profile = response[0];
                vm.approved = response[0].is_approved;
				vm.username = response[0].name;
                vm.id_salon = response[0].salon_id;
				vm.pic = response[0].salon_profpic ? 'assets/images/salon/'+response[0].salon_profpic : 'assets/images/default.jpg';
                // console.log(response);
                vm.getPendingAppointments(vm.id_salon,vm.username);
                
            } 
		})
	};

    
    vm.getPendingAppointments = function (x){
        vm.appointment_pending = [];
        LOADING.classList.add("open");
        vm.appointment_pending_notif = [];
        AppointmentSvc.get({request_appointment:true,salon_id:x})
        .then(function(response) {
                if (response.message) {
                    vm.appointment_pending = [];
                } else{
                    console.log(response);
                    response.forEach(function(item) {
                        if(item.salon_id == x){
                            // vm.appointment_pending = response;
                            vm.appointment_pending.push(item);
                        }
                    });
                }
                vm.request_appointment = vm.appointment_pending;
                vm.appointment_pending_notif = vm.appointment_pending;
                console.log('list',vm.appointment_pending);
                vm.countNotif = vm.appointment_pending_notif.length;
                LOADING.classList.remove("open");

            })
    }
  
    vm.accept_appointment = function(x){
        var data;
        data = angular.copy(x);
        data.accept =true;
        data.salon_name = vm.username;
        console.log(data);
        AppointmentSvc.save(data).then(function(response) {
        // AppointmentSvc.save(data).then(function(response) {
            if (response.success) {
                AppointmentSvc.showSwal('Success',response.message,'success');
             
            } else{
                AppointmentSvc.showSwal('Warning','Failed to accept request.','warning');
                
            }
            vm.getSalonData();
            // $state.reload();
            // vm.getPendingAppointments();
        })  
    }
    vm.deny_appointment = function(x){
        x.salon_name = vm.username;
        var options = {
            data:x,
            animation: true,
            templateUrl: TRANSURL + "appointment/deny.html?v=" + VERSION,
            controllerName: "CommentCtrl",
            viewSize: "md",
            filesToLoad: [
                TRANSURL + "appointment/deny.html?v=" + VERSION,
                TRANSURL + "appointment/controller.js?v=" + VERSION
            ]
        };
        AppSvc.modal(options).then(function(data) {
            if(data){
                vm.getSalonData();
            }
            // if (data) {
            //     // var data;
            //     // data = angular.copy(data);
            //     data.deny = true;
            //     data.salon_name = vm.username;
            //     console.log(data);
            //     AppointmentSvc.save(data).then(function(response) {
            //         if (response.success) {
            //             AppointmentSvc.showSwal('Success',response.message,'success');
                    
            //         } else{
            //             AppointmentSvc.showSwal('Warning','Failed to deny request.','warning');
                        
            //         }
            //         vm.getSalonData();
            //         // $state.reload();
            //         // vm.getPendingAppointments();
            //     })  
            // }
        });
        
    }
    // vm.getRequestForAppointment = function (){
    //     data.getAppointment = true;
    //     ApprovalSvc.get().then(function(response) {
    //             if (response.message) {
    //                 vm.appointment_list = [];
    //             } else {
    //                 vm.appointment_list = response;
    //             }
    //             vm.filtered = vm.appointment_list;
    //             vm.countNotif = vm.filtered.length;
    //         })
    // }
    // vm.openSalonProfile = function (x) {
    //     console.log(x);
    //     var data = {};
    //     if (x) {
    //         data.id = x;
    //         data.approval = true;
    //     }
    //     var options = {
    //         data: data,
    //         animation: true,
    //         templateUrl: MASTERURL + "salon/salon_profile.html?v=" + VERSION,
    //         controllerName: "SalonProfileCtrl",
    //         viewSize: "lg",
    //         filesToLoad: [
    //             MASTERURL + "salon/salon_profile.html?v=" + VERSION,
    //             MASTERURL + "salon/controller.js?v=" + VERSION
    //         ]
    //     };
    //     AppSvc.modal(options);
    //     vm.getRequestForApproval();
    // }
   
}
function CommentCtrl($scope, $ocLazyLoad, $injector, data, $uibModalInstance, filter, $uibModal,$state) {
    var modal = this;
    modal.variables = data;
    console.log('modal',data);
    $ocLazyLoad
        .load([
            TRANSURL + 'appointment/service.js?v=' + VERSION,
         ]).then(function(d) {
            AppointmentSvc = $injector.get("AppointmentSvc");
         
        });

    modal.deny = function (){
        var data = angular.copy(modal.variables);
        data.deny = true;
        console.log(data);
        AppointmentSvc.save(data).then(function(response) {
            if (response.success) {
                AppointmentSvc.showSwal('Success',response.message,'success');
                 modal.close();
            } else{
                AppointmentSvc.showSwal('Warning','Failed to deny request.','warning');
                
            }
           
        })  
    }
   
    modal.close = function() {
        $state.reload();
        $uibModalInstance.dismiss('cancel');
    }
}
