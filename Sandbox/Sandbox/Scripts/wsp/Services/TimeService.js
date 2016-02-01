(function () {
    'use strict';

    angular.module('myApp').factory('TimeService', TimeService);

    function TimeService($http, $rootScope, UtilityService) {
        var factory = {
            GetSubmittedDatesForMonth: GetSubmittedDatesForMonth,
            GetTimesheet: GetTimesheet
        };

        function GetSubmittedDatesForMonth(month) {
            return $http({
                method: 'GET',
                url: URL_LIST.GetSubmittedDatesForMonth + '?month=' + month,
                headers: { 'Content-Type': 'application/json' }
            }).then(function (result) {
                if (result.data != undefined && result.data != null) {
                    var dates = [];
                    angular.forEach(result.data, function (value, key) {
                        var date = UtilityService.ParseJsonDate(value);
                        dates.push(date.toJSON());
                    });
                    result.data = dates;
                }
                return result;
            });
        }

        function GetTimesheet(date) {
            return $http({
                method: 'POST',
                url: URL_LIST.GetTimesheet,
                data: { date: date.toGMTString() },
                headers: { 'Content-Type': 'application/json' }
            }).then(function (result) {
                return result;
            });
        }

        return factory;
    }
})();