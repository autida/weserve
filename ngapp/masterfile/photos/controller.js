angular.module('app')
    .controller('GalleryCtrl', GalleryCtrl)
    // .controller('SalonProfileCtrl', SalonProfileCtrl)

GalleryCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', '$uibModal', '$filter'];
// SalonProfileCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', 'data', '$uibModalInstance', '$filter','$uibModal','$state'];


function GalleryCtrl($scope, $ocLazyLoad, $injector, $uibModal, filter) {
    var vm = this;
    vm.MemberList = [];
    vm.filtered = [];
    vm.variables = {};
    vm.variablesdtl = {};
    vm.salon_count = 0;
    vm.imgdelete = 'false';
    var id_salon;
    $ocLazyLoad
        .load([MASTERURL + 'photos/service.js?v=' + VERSION,
        APPURL + 'app.service.js?v=' + VERSION, 
         ]).then(function(d) {
            GallerySvc = $injector.get("GallerySvc");
            AppSvc = $injector.get('AppSvc');
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
                } 
            })
        };
    
        vm.getSalonData = function (){
                AppSvc.get({salondata:true}).then(function (response) {
                    id_salon = response[0].salon_id;
                    vm.getGallery();
                })
            };

        vm.getGallery = function(){
            LOADING.classList.add("open");
            var data = {};
            data.id = id_salon;
            // data.gallery = true;
            console.log(data.id);
            GallerySvc.get({id:id_salon}).then(function(response) {
                if (response.message) {
                    vm.gallery = [];
                }else{
                    vm.gallery = response;
                }
                vm.filtered = vm.gallery;
                vm.salon_gallery = vm.filtered.length;
            LOADING.classList.remove("open");
        });
        }

        // vm.PhotoEdit = function(x){
        //     alert('thanks be to God');
        // }

        vm.newPhoto = function(){
            var file = document.getElementById('file');
            file.click();
        }

        vm.Preview = function () {
            vm.changeImage = true;
            var file = document.getElementById('file').files[0],
                r = new FileReader();
            r.onload = function (e) {
                // document.getElementById('img').src = 'data:image/jpeg;base64,' + btoa(e.target.result);
                // document.getElementById('img-top').src = 'data:image/jpeg;base64,' + btoa(e.target.result);
            };
            r.readAsBinaryString(file);
    
            vm.savePhoto();
        };
        vm.savePhoto = function (){
            var newData = new FormData();
            newData.append('image', vm.gallery.image);
            newData.append('id_lnk', id_salon);
            if (vm.changeImage) {
                newData.append('image',vm.image);
            }
            GallerySvc.upload(newData).then(function (response) {
                if (response.success) {
                    AppSvc.showSwal('Success', response.message, 'success');
                   
                } else {
                        AppSvc.showSwal('Ooops', response.message, 'warning');
                }
                vm.getGallery();
            });
        }

        vm.delete =function(){
            vm.imgdelete = 'true';
        }
        vm.PhotoEdit = function(x){
            var data = {};
            data.img_id = x; 
            data.deleteImg = true;
            GallerySvc.save(data).then(function(response) {
                if (response.success) {
                    vm.getGallery();
                    vm.imgdelete = 'false';
                    GallerySvc.showSwal('Success', response.message, 'success');
                } else {
                    GallerySvc.showSwal('Ooops', response.message, 'warning');
                }
                console.log(response);
                // LOADING.classList.remove("open");
            })
        }
    
   
}


