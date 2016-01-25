(function () {
    'use strict';

    angular.module('myApp').factory('EmployeeService', EmployeeService);

    function EmployeeService($http) {
        var factory = {
            SubmitEmployee: SubmitEmployee
        };

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

        return factory;
    }
})();