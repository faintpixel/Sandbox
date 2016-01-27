(function () {
    'use strict';

    angular.module('myApp').controller('EmployeeOverviewController', EmployeeOverviewController);

    function EmployeeOverviewController($scope, EmployeeService) {
        var vm = this;

        vm.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            enableRowSelection: true,
            multiSelect: false,
            enableRowHeaderSelection: false
        };

        $scope.$on('EmployeeAdded', HandleEmployeeAddedEvent);

        Activate();

        function Activate() {
            EmployeeService.GetEmployees().then(GetComplete).catch(GetError);

            function GetComplete(result) {
                vm.gridOptions.data = result.data;
            }

            function GetError(result) {
                alert("Error getting employee list");
            }
        }

        function HandleEmployeeAddedEvent(e, employee) {
            console.log('added employee: ' + employee);
            vm.gridOptions.data.push(employee);
        }        
    }

})();

