(function () {
    'use strict';

    angular.module('myApp').controller('EmployeeOverviewController', EmployeeOverviewController);

    function EmployeeOverviewController($scope, EmployeeService, uiGridConstants) {
        var vm = this;

        vm.gridApi = null;
        vm.selectedDetail = "";

        vm.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            enableRowSelection: true,
            multiSelect: false,
            enableRowHeaderSelection: false,
            showColumnFooter: true,
            onRegisterApi: OnRegisterApi,
            columnDefs: [
                { field: 'number', aggregationType: uiGridConstants.aggregationTypes.sum },
                { field: 'employee' },
                { field: 'office', displayName: 'Location' }
            ]
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

        function OnRegisterApi(gridApi) {
            vm.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                vm.selectedDetail = row.entity.number + ", " + row.entity.comment;
                console.log(row);
            });
        }
    }

})();

