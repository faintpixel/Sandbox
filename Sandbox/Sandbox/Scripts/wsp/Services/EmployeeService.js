(function () {
    'use strict';

    angular.module('myApp').factory('EmployeeService', EmployeeService);

    function EmployeeService($http, $rootScope) {
        var factory = {
            BroadcastNewEmployee: BroadcastNewEmployee,
            GetEmployees: GetEmployees,
            SubmitEmployee: SubmitEmployee,
        };

        function BroadcastNewEmployee(employee) {
            $rootScope.$broadcast('EmployeeAdded', employee);
        }

        function SubmitEmployee(employee) {
            var submissionData = {};
            submissionData.employee = employee;            

            return $http({
                method: 'POST',
                url: URL_LIST.SubmitEmployee,
                data: submissionData,
                headers: { 'Content-Type': 'application/json' }
            }).then(function (result) {
                return result;
            });
        }

        function GetEmployees() {
            return $http({
                method: 'GET',
                url: URL_LIST.GetAllEmployees
            }).then(function (result) {
                return result;
            });
        }        

        return factory;
    }
})();