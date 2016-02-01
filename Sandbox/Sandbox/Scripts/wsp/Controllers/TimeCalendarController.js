(function () {
    'use strict';

    angular.module('myApp').controller('TimeCalendarController', TimeCalendarController);

    function TimeCalendarController($scope, $rootScope, ProjectService, TimeService) {
        var vm = this;

        vm.dateFormat = 'd-MMM-yyyy';
        vm.selectedDate = new Date();
        vm.submittedDates = [];

        vm.GetDayClass = GetDayClass;
        vm.Initialize = Initialize;
        vm.MonthChanged = MonthChanged;


        $scope.$on('datepickerMonthChanged', vm.MonthChanged);
        $scope.$watch(angular.bind(this, function () { return this.selectedDate; }), SelectedDateChanged);

        MonthChanged(null, vm.selectedDate.getMonth() + 1);

        function Initialize() {
            //MonthChanged(null, vm.selectedDate.getMonth() + 1);
            console.log('initialized calendar');
        }
       
        function GetDayClass(date) {
            console.log('setting class for ' + date);
            date.setHours(0, 0, 0, 0);
            date = date.toJSON();
            if (vm.submittedDates.indexOf(date) != -1) {
                return 'submitted';
            }
        }

        function MonthChanged(datepicker, month) {
            console.log("Month changed to " + month);

            TimeService.GetSubmittedDatesForMonth(2).then(complete).catch(error);

            function complete(result) {
                console.log('got dates: ' + result.data);
                vm.submittedDates = result.data;
                $scope.$broadcast('refreshDatepickers');
            }

            function error(result) {
                console.log('Error updating calendar: ' + result);
            }
        }

        function SelectedDateChanged() {
            console.log('selected date changed to ' + vm.selectedDate);
            $rootScope.$broadcast('newDateSelected', vm.selectedDate);
        }

    }

})();

