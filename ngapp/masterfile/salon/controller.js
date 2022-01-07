angular.module('app',['ngSanitize'])
    .controller('MemberRegCtrl', MemberRegCtrl)
    .controller('SalonProfileCtrl', SalonProfileCtrl)

MemberRegCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', '$uibModal', '$filter'];
SalonProfileCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', 'data', '$uibModalInstance', '$filter','$uibModal','$state'];


function MemberRegCtrl($scope, $ocLazyLoad, $injector, $uibModal, filter) {
    var vm = this;
    vm.MemberList = [];
    vm.filtered = [];
    vm.variables = {};
    vm.variablesdtl = {};
    vm.salon_count = 0;
    vm.salon_list = [];
    vm.filteredsalon = [];
    vm.filteredsalonReview = [];
    vm.filtered = [];
    $ocLazyLoad
        .load([MASTERURL + 'salon/service.js?v=' + VERSION,
        APPURL + "dashboard/service.js?v=" + VERSION
         ]).then(function(d) {
            DashboardSvc = $injector.get("DashboardSvc");
            vm.getSalon();
           
        });
        vm.getSalon = function() {
            LOADING.classList.add("open");
            DashboardSvc.get().then(function(response) {
                if (response.message) {
                    vm.salon_list = [];
                } else {
                    // response.forEach(function(item) {
                    //     item.salonRating = '<span style="color:yellow;font-size=20px">★★★★★</span>';
                    //     vm.salon_list.push(item);
                    // })
                    vm.salon_list = response;
                }
                vm.filteredsalon = vm.salon_list;
                console.log('salonfiltered',vm.filteredsalon);
                vm.salon_count = vm.filteredsalon.length;
                vm.getSalonReview();
            })
        }
        vm.getSalonReview = function() {
            LOADING.classList.add("open");
            DashboardSvc.get({get_salon_Rating:true}).then(function(response) {
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
                       
                        if(vm.filteredsalon[$i].salon_id == vm.filteredsalonReview[$j].salon_id){
                            vm.filteredsalon[$i].rate = parseInt(vm.filteredsalonReview[$j].rate).toString();
                        }
                       
                    }
                }
                console.log(vm.filteredsalon);
                // for($i=0;$i<vm.filteredsalon.length;$i++){
                //     for($j=0;$j<vm.filteredsalonReview.length;$j++){
                //         rating =0;
                //         if(vm.filteredsalon[$i].salon_id == vm.filteredsalonReview[$j].salon_id){
                //             salonID = $i;
                           
                            
                //             // vm.filteredsalon[$i].rate = vm.filteredsalonReview[$j].rate;
                //             // vm.filtered.push(vm.filteredsalon);
                //             // vm.sched_array.push(filter('date')(response[$i].day_name, ' '));
                //             rate = rate + parseInt(vm.filteredsalonReview[$j].rate);
                //             console.log('rateni',rate);
                //             rating = 0;
                //             cnt++;
                //         }else{
                //             // ?vm.filteredsalon[$i].rate = 0;
                //             // vm.filtered.push(vm.filteredsalon);
                //             if(rate>=1){
                //                 rating = rate/cnt;
                //                 // vm.filteredsalon[salonID].rate = rating.toString();
                //                 vm.filteredsalon[salonID].rate = parseInt(rating).toString();
                //                rate = 0;
                //                rating = 0;
                //                cnt=0;
                //             }else
                //             vm.filteredsalon[$i].rate = vm.filteredsalonReview[$j].rate;
                //             // rate = 0;
                //             // rating = 0;
                //         }
                       
                //     }
                //     console.log('rating',vm.filteredsalon[$i].rate);
                // }
                // console.log('filteredsa',vm.filteredsalon);
               
                LOADING.classList.remove("open");
            })
        }
    vm.getData = function(x) {
        console.log(x);
        var data = {};
        if (x) {
            data.id = angular.copy(x);
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
        AppSvc.modal(options).then(function(data) {
            if (data) {
            }
        });
    }
   
    vm.searching = function() {
            if (!vm.search) {
                return vm.filtered = vm.memberList;
            }
            return vm.filtered = filter('filter')(vm.memberList, { FullName: vm.search });
        }
        // vm.searching = function () {
        //     if (!vm.search) {
        //         return vm.filtered = vm.PropertyList;
        //     }
        //     return vm.filtered = filter('filter')(vm.PropertyList, { Contract_num: vm.search });
        // }

   
    
   
}
function SalonProfileCtrl($scope, $ocLazyLoad, $injector, data, $uibModalInstance, filter, $uibModal,$state) {
    var modal = this;
    modal.variables = {};
    modal.variables.birthdate = new Date();
    console.log('abotdari',data.id);
    modal.id = data.id;
    modal.avblepicbs ='false';
    modal.approval = data.approval;

    
    $ocLazyLoad
    .load([MASTERURL + 'salon/service.js?v=' + VERSION, ]).then(function(d) {
        SalonProfileSvc = $injector.get("SalonProfileSvc");
        modal.getSalonProfile();
        modal.getSalonPicture();
        modal.getSalonBS();
    });

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
    modal.approved = function (id){
        SalonProfileSvc.save({post:true,id:id}).then(function(response) {
            if (response.message) {
                SalonProfileSvc.showSwal('Erorr', "Contact your developer",'warning');
            }else {
               
                SalonProfileSvc.showSwal('Success', "Registration approved.","success");
                modal.close();
            }

        })
    }
   
    modal.close = function() {
        $state.reload();
        $uibModalInstance.dismiss('cancel');
    }
}

