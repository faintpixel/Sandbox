(function () {
    'use strict';

    angular.module("myApp").controller("FormController", FormController);

    function FormController(EmployeeService) {
        var vm = this;
                
        vm.employee = {};
        vm.employee.employee = "";
        vm.employee.office = "";
        vm.employee.worksInOffice = false;
        vm.officeChoices = [];
        vm.message = "";
        vm.messages = [];
        vm.test = "123";
        vm.title = "Test form for user " + this.currentEmployee;
        
        vm.Initialize = Initialize;
        vm.IsCommentRequired = IsCommentRequired;
        vm.SubmitForm = SubmitForm;

        function Initialize(messages, currentEmployee, officeChoices) {
            vm.employee.employee = currentEmployee;
            vm.messages = messages;
            vm.officeChoices = officeChoices;
        }

        function IsCommentRequired() {
            if (vm.employee.worksInOffice && vm.employee.office == "3")
                return true;
            else
                return false;
        }       

        function SubmitForm() {
            EmployeeService.SubmitEmployee(vm.employee).then(SubmitComplete).catch(SubmitError);

            function SubmitComplete(result) {
                console.log("Done.");
                console.log(result);
                vm.message = result;
            }

            function SubmitError(result) {
                console.log("ERROR");
                vm.message = "Error :(";
            }
        }        
    }

})();

