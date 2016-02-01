(function () {
    'use strict';

    angular.module('myApp').factory('ProjectService', ProjectService);

    function ProjectService($http, $rootScope) {
        var factory = {
            GetProjectPhases: GetProjectPhases,
            GetProjectPhaseSubPhases: GetProjectPhaseSubPhases
        };

        function GetProjectPhases(project) {
            return $http({
                method: 'GET',
                url: URL_LIST.GetProjectPhases + "?project=" + project,
                headers: { 'Content-Type': 'application/json' }
            }).then(function (result) {
                return result;
            });
        }

        function GetProjectPhaseSubPhases(project, phase) {
            return $http({
                method: 'GET',
                url: URL_LIST.GetProjectPhaseSubPhases + '?project=' + project + '&phase=' + phase,
                headers: { 'Content-Type': 'application/json' }
            }).then(function (result) {
                return result;
            });
        }

        return factory;
    }
})();