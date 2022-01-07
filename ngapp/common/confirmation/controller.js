angular.module('app')
    .controller('ConfirmationCtrl', ConfirmationCtrl)

ConfirmationCtrl.$inject = ['$scope', '$ocLazyLoad', '$injector', 'data', '$uibModalInstance'];

function ConfirmationCtrl($scope, $ocLazyLoad, $injector, data, $uibModalInstance) {
    var modal = this;
    modal.focusButton = true;
    modal.variables = angular.copy(data);

    modal.close = function (bool) {
        $uibModalInstance.close(bool);
    }
}