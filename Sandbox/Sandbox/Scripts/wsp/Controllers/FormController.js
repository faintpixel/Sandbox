(function () {
    'use strict';

    angular.module('myApp').controller('FormController', FormController);

    function FormController(EmployeeService, $uibModal) {
        var vm = this;

        vm.dateFormat = 'd-MMM-yyyy';
        vm.dateOptions = {
            'format-day': 'd',
            'starting-day': 0
        };
        vm.employee = {
            'employee': '',
            'office': '',
            'startDate': new Date(),
            'worksInOffice': false
        };
        vm.officeChoices = [];
        vm.message = '';
        vm.messages = [];
        vm.startDateOpen = false;
        vm.test = '123';
        vm.title = 'Test form for user ' + this.currentEmployee;
        
        vm.Initialize = Initialize;
        vm.IsCommentRequired = IsCommentRequired;
        vm.OpenAboutPopup = OpenAboutPopup;
        vm.OpenStartDatePicker = OpenStartDatePicker;
        vm.SubmitForm = SubmitForm;

        function Initialize(messages, currentEmployee, officeChoices) {
            vm.employee.employee = currentEmployee;
            vm.messages = messages;
            vm.officeChoices = officeChoices;
        }

        function IsCommentRequired() {
            if (vm.employee.worksInOffice && vm.employee.office == '3')
                return true;
            else
                return false;
        }

        function OpenAboutPopup() {
            var popupInstance = $uibModal.open({
                templateUrl: 'aboutPopup.html'
            });
        }

        function OpenStartDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.startDateOpen = true;
        }

        function SubmitForm() {
            EmployeeService.SubmitEmployee(vm.employee).then(SubmitComplete).catch(SubmitError);

            function SubmitComplete(result) {
                console.log('Done.');
                console.log(result);
                vm.message = result;
                EmployeeService.BroadcastNewEmployee(result.data);
            }

            function SubmitError(result) {
                console.log('ERROR');
                vm.message = 'Error :(';
            }
        }        
    }

})();

