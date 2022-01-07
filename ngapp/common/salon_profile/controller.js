angular.module('app').controller('SalonProfileCtrl', SalonProfileCtrl);
SalonProfileCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector'];

function SalonProfileCtrl($scope, $ocLazyLoad, $injector) {
    var vm = this;
    vm.changeBox = 'username';
    vm.changeImage = false;
    vm.password = {};
    vm.username = {};
    vm.profile = {};
    vm.variables = {};
    vm.avblepic = 'false';
    vm.avblepicbs='false';
    // vm.profile.ProfilePic = 'assets/images/default.jpg';
    $ocLazyLoad.load([
        APPURL + 'app.service.js?v=' + VERSION,
    ]).then(function (d) {
        AppSvc = $injector.get('AppSvc');
        vm.getUserCredentials();
    });
    vm.getUserCredentials = function () {
        LOADING.classList.add("open");
        AppSvc.get().then(function (response) {
            console.log(response);
            if (response) {
                // vm.profile.ProfilePic = response.record.pic ? 'assets/images/profpic/'+response.record.pic : 'assets/images/default.jpg';
                if(response.record.level == 1){
					vm.getAdminData();
				}else{
					vm.getSalonData();
				}
            }
            LOADING.classList.remove("open");
        });
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
                // vm.pic = response[0].salon_business_permit ? 'assets/images/salon/'+response[0].salon_business_permit : 'assets/images/default.jpg';
                vm.avblepic ='true';
                vm.avblepicbs = 'true';
                console.log('salon',response);
                vm.profile = response[0];
            } 
           
		})
	};

    
    vm.Preview = function () {
        vm.changeImage = true;
        var file = document.getElementById('file').files[0],
            r = new FileReader();
        r.onload = function (e) {
            document.getElementById('img').src = 'data:image/jpeg;base64,' + btoa(e.target.result);
            document.getElementById('img-top').src = 'data:image/jpeg;base64,' + btoa(e.target.result);
        };
        r.readAsBinaryString(file);
    };
    vm.changePic = function () {
        var file = document.getElementById('file');
        file.click();
    }
    vm.saveusername = function () {
        LOADING.classList.add('open');
        var data = angular.copy(vm.variables);
        data.edit = true;
        AppSvc.save(data).then(function (response) {
            if (response.success) {
                AppSvc.showSwal('Success', response.message, 'success');
            } else {
                if (response.username) {
                    AppSvc.showSwal('Ooops', "This username was already in the record! Please try another username. Thank you.", 'danger');
                } else if (response.password) {
                    AppSvc.showSwal('Ooops', "You inputted wrong password! Please try again.", 'danger');
                } else {
                    AppSvc.showSwal('Ooops', 'Nothing Changed. Failed Saving.', 'warning');
                }

            }
            LOADING.classList.remove('open');
        });
    };
    vm.savepassword = function () {
        if (vm.password.Retypepassword !== vm.password.Newpassword) {
            return AppSvc.showSwal(
                'Ooops',
                'New password does not match to Retype password. Try Again',
                'warning'
            );
        }
        LOADING.classList.add('open');
        var data = angular.copy(vm.variables);
        data.changePass = true;
        AppSvc.save(data).then(function (response) {
            if (response.success) {
                AppSvc.showSwal('Success', response.message, 'success');
            } else {
                if (response.password) {
                    AppSvc.showSwal('Ooops', "You're old password is incorrect! Please try again.", 'danger');
                } else {
                    AppSvc.showSwal('Ooops', 'Nothing Changed. Failed Saving.', 'warning');
                }

            }
            LOADING.classList.remove('open');
        });
    };
    vm.saveProfPic = function () {
        var newData = new FormData();
        newData.append('description', vm.profile.description);
        newData.append('file_id', vm.profile.file_id);
        newData.append('file', vm.profile.file);
        newData.append('date', AppSvc.getDate(vm.profile.date));
        newData.append('password', vm.profile.password);
        newData.append('ProfilePic', vm.profile.ProfilePic);
        newData.append('changePic', true);
        if (vm.changeImage) {
            newData.append('image', vm.image);
        }
        LOADING.classList.add('open');
        AppSvc.upload(newData).then(function (response) {
            console.log(response);
            if (response.success) {
                AppSvc.showSwal('Success', response.message, 'success');
            } else {
                if (response.password) {
                    AppSvc.showSwal('Ooops', "You inputted wrong password! Please try again.", 'danger');
                } else {
                    AppSvc.showSwal('Ooops', response.message, 'warning');
                }
            }
            LOADING.classList.remove('open');
        });
    }
}