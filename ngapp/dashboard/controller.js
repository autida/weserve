// const { data } = require("jquery");

//main.js
angular
    .module("app")
    .controller("DashboardCtrl", DashboardCtrl)
    .controller("CalendarCtrl", CalendarCtrl)
    .controller("ContactInformationCtrl", ContactInformationCtrl);

DashboardCtrl.$inject = ["$scope", "$ocLazyLoad", "$injector",'$state'];
CalendarCtrl.$inject = ["$scope", "$ocLazyLoad", "$injector", "$state", "$filter"];
ContactInformationCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', 'data', '$uibModalInstance', '$filter','$uibModal','$state'];

function DashboardCtrl($scope, $ocLazyLoad, $injector,$state) {
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
    vm.avblepic = 'false';
    vm.avblepicbs = 'false';
    vm.profile = {};
    vm.filteredap = [];
    var data;
    $ocLazyLoad
        .load([
            APPURL + "dashboard/service.js?v=" + VERSION,
            TRANSURL + 'approval/service.js?v=' + VERSION,
            APPURL + 'app.service.js?v=' + VERSION,
            TRANSURL + 'appointment/service.js?v=' + VERSION,
        ])
        .then(function(d) {
            DashboardSvc = $injector.get("DashboardSvc");
            ProfSvc = $injector.get('ProfSvc');
            ApprovalSvc = $injector.get("ApprovalSvc");
            AppSvc = $injector.get('AppSvc');
            BpermitSvc = $injector.get('BpermitSvc');
            AppointmentDashSvc = $injector.get('AppointmentDashSvc');
            AppointmentSvc = $injector.get('AppointmentSvc');
           
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
                vm.getClientNum();
            } 
		})
	};

	vm.getSalonData = function (){
		AppSvc.get({salondata:true}).then(function (response) {
			if (response) {
                vm.approved = response[0].is_approved;
				vm.username = response[0].name;
                vm.id_salon = response[0].salon_id;
				vm.pic = response[0].salon_profpic ? 'assets/images/salon/'+response[0].salon_profpic : 'assets/images/default.jpg';
                vm.avblepic = 'true';
                vm.avblepicbs = 'true';
                vm.profile = response[0];
                vm.getAppointments(vm.id_salon);
                // console.log(vm.profile,'prof');
            } 
		})
	};
    vm.getClientNum = function (){
        DashboardSvc.get({customer_cnt:true}).then(function (response) {
			if (response.message) {
                vm.client_num = 0;
            }else{
                vm.client_num = response[0].c;
                console.log(response);
            }
        });
    }

    vm.getAppointments = function (x){
        LOADING.classList.add("open");
        console.log(x);
        // appointment:true,
        vm.appointment_list = [];
        AppointmentDashSvc.get({salon_id:x}).then(function(response) {
                if (response.message) {
                    vm.appointment_list = [];
                } else{
                    // console.log(response.status);
                    response.forEach(function(item) {
                        item.status = item.status.toLowerCase();
                        // && item.status == 'completed' || item.status != 'active'
                        if(item.salon_id == x){
                            vm.appointment_list.push(item);
                        }
                        // if(item.status == 'pending'){
                        //     vm.appointment_pending=item.response;
                        // }else{
                        //     vm.appointment_list=item.response;
                        // }
                        
                    //     // vm.fitererdsched.push(item);
                    });
                    
                    // vm.appointment_list=response;
                }
                
                vm.filteredap = vm.appointment_list;
                console.log('list',vm.appointment_list);
                vm.appointment_count = vm.filteredap.length;
                // console.log('pending',vm.appointment_pending);
                // vm.appointment_list_num = vm.filtered.length;
                vm.getSalonReview();
            })
        }

        vm.getSalonReview = function() {
            DashboardSvc.get({review:true}).then(function(response) {
                if (response.message) {
                    vm.salon_review_list = [];
                } else {
                    vm.salon_review_list = response;
                }
                vm.filteredsalonReview = vm.salon_review_list;
                for($i=0;$i<vm.filteredap.length;$i++){
                    for($j=0;$j<vm.filteredsalonReview.length;$j++){
                        if(vm.filteredap[$i].appointment_id == vm.filteredsalonReview[$j].appointment_id ){
                            // if(vm.filteredap[$i].status == 'completed' || vm.filteredap[$i].status == 'COMPLETED'|| vm.filteredap[$i].status == 'rated'){
                                vm.filteredap[$i].review = vm.filteredsalonReview[$j].remarks;
                                // vm.filteredap[$i].review = '';
                            // }
                        }
                       
                    }
                }
                console.log('filteredsa',vm.filteredap,vm.filteredsalonReview);
               
                LOADING.classList.remove("open");
            })
        }

        vm.AppointmentComplete = function(x){
            var data;
            data = angular.copy(x);
            data.complete =true;
            data.salon_name = vm.username;
            console.log(data);
            AppointmentSvc.save(data).then(function(response) {
            // AppointmentSvc.save(data).then(function(response) {
                if (response.success) {
                    AppointmentSvc.showSwal('Success',response.message,'success');
                 
                } else{
                    AppointmentSvc.showSwal('Warning','Appointment Completed.','warning');
                    
                }
                vm.getSalonData();
            })  
        }
   
    // vm.getPendingAppointments = function (x){
    //     LOADING.classList.add("open");
    //     DashboardSvc.get({request_appointment:true,salon_id:x}).then(function(response) {
    //             if (response.message) {
    //                 vm.appointment_pending = [];
    //             } else{
    //                 vm.appointment_pending=response;
    //             }
                
    //             // vm.filteredap = vm.appointment_list;
    //             vm.appointment_pending_notif = vm.appointment_pending;
    //             console.log('list',vm.appointment_list);
    //             console.log('pending',vm.appointment_pending);
    //             // vm.appointment_list_num = vm.filtered.length;
    //             LOADING.classList.remove("open");
    //         })
    // }
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
    vm.updateSalonProfile = function(){
        // alert('gogogogo');
        var file = document.getElementById('file');
        file.click();
    }
    vm.Preview = function () {
        vm.changeImage = true;
        var file = document.getElementById('file').files[0],
            r = new FileReader();
        r.onload = function (e) {
            document.getElementById('img').src = 'data:image/jpeg;base64,' + btoa(e.target.result);
            // document.getElementById('img-top').src = 'data:image/jpeg;base64,' + btoa(e.target.result);
        };
        r.readAsBinaryString(file);

        vm.submitSalonProfpic();
    };
    vm.updateBusinessPermit = function(){
        // alert('gogogogo');
        var file = document.getElementById('bsfile');
        file.click();
    }
    vm.Preview_business_permit = function () {
        vm.changeImagebs = true;
        var file = document.getElementById('bsfile').files[0],
            r = new FileReader();
        r.onload = function (e) {
            document.getElementById('bs').src = 'data:image/jpeg;base64,' + btoa(e.target.result);
            // document.getElementById('img-top').src = 'data:image/jpeg;base64,' + btoa(e.target.result);
        };
        r.readAsBinaryString(file);
        vm.submitSalonbusiness_permit();
    };
    vm.submitSalonProfpic = function (){
        // console.log(vm.profile);
        var newData = new FormData();
        newData.append('ProfilePic', vm.profile.salon_profpic);
        newData.append('salon_id', vm.profile.salon_id);
        // newData.append('changePic', true);
        if (vm.changeImage) {
            newData.append('image',vm.image);
        }
        // LOADING.classList.add('open');
        // console.log('praise God',newData);
        ProfSvc.upload(newData).then(function (response) {
            if (response.success) {
                // vm.getUserCredentials();
                // vm.getSalonData();
                AppSvc.showSwal('Success', response.message, 'success');
               
            } else {
                    // AppSvc.showSwal('Ooops', response.message, 'warning');
            }
            $state.reload();
            // LOADING.classList.remove('open');
            // console.log('picni',response);
        });
    }
   vm.submitSalonbusiness_permit = function () {
        var newData = new FormData();
        newData.append('ProfilePic', vm.profile.salon_business_permit);
        newData.append('salon_id', vm.profile.salon_id);
        // newData.append('changebusiness_permit', true);
        if (vm.changeImagebs) {
            newData.append('image', vm.imagebs);
        }
        LOADING.classList.add('open');
        BpermitSvc.upload(newData).then(function (response) {
           
            if (response.success) {
                AppSvc.showSwal('Success', response.message, 'success');
               
            } else {
                    // AppSvc.showSwal('Ooops', response.message, 'warning');
                
            }
            $state.reload();
            LOADING.classList.remove('open');
        });
    }
    vm.saveContactInfo = function(x){
        console.log(x);
        var data = {};
        if (x) {
            data = angular.copy(x);
        }
        var options = {
            data: data,
            animation: true,
            templateUrl: APPURL + "dashboard/modal_contact_information.html?v=" + VERSION,
            controllerName: "ContactInformationCtrl",
            viewSize: "lg",
            filesToLoad: [
                APPURL + "dashboard/modal_contact_information.html?v=" + VERSION,
                APPURL + "dashboard/controller.js?v=" + VERSION
            ]
        };
        AppSvc.modal(options).then(function(data) {
            if (data) {
            }
        });
    }
    vm.submitProfile = function(){
        // var data;
        // data.salon_id = vm.id_salon;
        // data.submitData = true;
        DashboardSvc.save({submitData:true,salon_id:vm.id_salon}).then(function (response) {
            if (response.success) {
                DashboardSvc.showSwal('Success', response.message, 'success');
               
            } else {
                    // DashboardSvc.showSwal('Ooops', response.message, 'warning');
            }
            $state.reload();
        });
    }
}

function CalendarCtrl($scope, $ocLazyLoad, $injector, $state, filter) {
    var vm = this;
	var filter = $injector.get('$filter');
	vm.events = [];
	vm.filtered = [];
	$ocLazyLoad.load([
        APPURL + 'dashboard/service.js?v=' + VERSION,
        APPURL + 'app.service.js?v=' + VERSION,
    ]).then(function(d) {
		CalendarSvc = $injector.get('CalendarSvc');
        AppSvc = $injector.get('AppSvc');
		// vm.getData();
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
                console.log(response);
                vm.getAppointments(vm.id_salon);
                
            } 
		})
	};

    vm.getAppointments = function (x){
        LOADING.classList.add("open");
        console.log(x);
        vm.appointment_lists = [];
        CalendarSvc.get({getAcceptedAppointment:true,salon_id:x}).then(function(response) {
                if (response.message) {
                    vm.appointment_list = [];
                } else{
                    // vm.appointment_list=response;
                    response.forEach(function(item) {
                        // && item.status =!= 'denied' || item.status != "pending"
                        if(item.salon_id == x && item.is_deleted == 0 ){
                            item.title ="Staff: "+ item.fname;
                            item.start = item.date_start;
                            item.end = item.date_end;
                            item.color = 'blue';
                            vm.appointment_lists.push(item);
                        }
                        
                    });
                    vm.appointment_list = vm.appointment_lists;
                }
                console.log(vm.appointmen_list);
			    CalendarView(vm.appointment_list);
                LOADING.classList.remove("open");
            });
    };
	// vm.getData = function() {
	// 	// vm.vehicle = '';
	// 	CalendarSvc.get({getAcceptedAppointment: true }).then(function(response) {
	// 		if (!response.message) {
	// 			// response.forEach(function(item) {
	// 			// 	item.title = item.person_in_charge + '(' + item.RVRNo + ')';
	// 			// 	item.start = item.date_from;
	// 			// 	item.end = item.date_to;
	// 			// 	item.color = 'yellowgreen';
	// 			// });
	// 			vm.events = response;
	// 		} else {
	// 			vm.events = [];
	// 		}
    //         console.log(response);
	// 		CalendarView(vm.events);
	// 	});
	// };
	function CalendarView(events) {
		$('#calendar').fullCalendar('destroy');
		$('#calendar').fullCalendar({
			height: 650,
			defaultView: 'month',
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay',
			},
			// selectable: true,
			selectHelper: true,
			// editable: true,
			eventLimit: true,
			eventSources: [
				{
					events: events,
				},
			],
			
		});
	}
	
}

function ContactInformationCtrl($scope, $ocLazyLoad, $injector, data, $uibModalInstance, filter, $uibModal,$state) {
    var modal = this;
    modal.variables = {};
    modal.id = data.id;
    modal.avblepicbs ='false';
    modal.approval = data.approval;
    modal.profile = data;
    modal.profile.office_hrs_in = new Date();
    modal.profile.office_hrs_out = new Date();

    
    $ocLazyLoad
    .load([MASTERURL + 'salon/service.js?v=' + VERSION, ]).then(function(d) {
        SalonProfileSvc = $injector.get("SalonProfileSvc");
        modal.getSalonProfile();
        // modal.getSalonPicture();
        // modal.getSalonBS();
    });
    function getTime(inputDate) {
		var dt = new Date(inputDate);
		var dtString =
			dt.getHours() +
			':' +
			dt.getMinutes() +
			':' +
			dt.getSeconds();
		return dtString;
	}

    modal.getSalonProfile = function(){
        SalonProfileSvc.get({id:modal.id})
        .then(function(response){
            if(response){
                modal.variables = response[0];
            }else{
                SalonProfileSvc.showSwal('Erorr', "Contact your developer","warning");
            }
            
        })
    }
    modal.getSalonPicture = function(){
        SalonProfileSvc.get({pic:true,id:modal.id})
        .then(function(response){
            if(response){
                modal.avblepic = 'true';
                modal.variables.profpic = response[0].image;
                console.log(modal.variables.profpic);
            }else
            modal.avblepic = 'false';
            
        })
    }
    modal.getSalonBS = function(){
        SalonProfileSvc.get({bs:true,id:modal.id})
        .then(function(response){
            if(response.message){
                modal.avblepicbs = 'false';
            }else{
                modal.avblepicbs ='true';
                modal.variables.bspermit = response[0].image;
            }
           
            
        })
    }
    modal.openbusPermit = function(){
        // console.log('abot');
        var options = {
            data:'',
            animation: true,
            templateUrl: MASTERURL + "salon/modal_buspermit.html?v=" + VERSION,
            controllerName: "SalonProfileCtrl",
            viewSize: "lg",
            filesToLoad: [
                MASTERURL + "salon/modal_buspermit.html?v=" + VERSION,
                MASTERURL + "salon/controller.js?v=" + VERSION
            ]
        };
        AppSvc.modal(options).then(function(data) {
        });
    }
    modal.delete = function(id){
        SalonProfileSvc.save({delete:true,id:id}).then(function(response) {
            if (response.message) {
                SalonProfileSvc.showSwal('Erorr', "Contact your developer",'warning');
            }else {
                SalonProfileSvc.showSwal('Success', "Salon Deleted.","success");
                modal.close();
            }
        })
    }
    modal.denied = function (id){
        SalonProfileSvc.save({denied:true,id:id}).then(function(response) {
            if (response.message) {
                SalonProfileSvc.showSwal('Erorr', "Contact your developer",'warning');
            }else {
                SalonProfileSvc.showSwal('Success', "Registration request rejected.","success");
                modal.close();
            }

        })
    }
    modal.saveInfo = function (){
        var info = {};
        info = angular.copy(modal.profile);
        info.office_hrs_in =getTime(info.office_hrs_in);
        info.office_hrs_out =getTime(info.office_hrs_out);
        console.log(info.salon_id);
        data = angular.copy(info);
        data.saveInfo = true;
        SalonProfileSvc.save(data).then(function(response) {
            if (response.message) {
                console.log(response);
                SalonProfileSvc.showSwal('Erorr', "Contact your developer",'warning');
            }else {
                SalonProfileSvc.showSwal('Success', "Successfully updated.","success");
                modal.close();
            }

        })
    }
   
    modal.close = function() {
        $state.reload();
        $uibModalInstance.dismiss('cancel');
    }
}