(function () {
    'use strict';

    angular.module('myApp').controller('EmployeeOverviewController', EmployeeOverviewController);

    function EmployeeOverviewController(EmployeeService) {
        var vm = this;


        vm.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            
        };

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
    }

})();

