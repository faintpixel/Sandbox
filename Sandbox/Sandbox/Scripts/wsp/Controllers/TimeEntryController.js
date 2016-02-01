(function () {
    'use strict';

    angular.module('myApp').controller('TimeEntryController', TimeEntryController);

    function TimeEntryController($scope, ProjectService, TimeService) {
        var vm = this;

        vm.employeeName = '';
        vm.employeeNumber = '';
        vm.loadingPhases = false;
        vm.loadingSubPhases = false;
        vm.phaseList = [];
        vm.projectList = [];
        vm.selectedDate = new Date();
        vm.subPhaseList = [];
        vm.timeSheet = {
            project: '',
            phase: '',
            subPhase: '',
            comment: '',
            hours: 0,
            overtime: 0
        };

        vm.Initialize = Initialize;
        vm.LoadPhases = LoadPhases;
        vm.LoadSubPhases = LoadSubPhases;
        vm.SubmitTime = SubmitTime;

        $scope.$on('newDateSelected', NewDateSelectedEvent);

        function Initialize(employeeName, employeeNumber, projectList) {
            vm.employeeName = employeeName;
            vm.employeeNumber = employeeNumber;
            vm.projectList = projectList;
        }

        function LoadPhases(project) {
            vm.loadingPhases = true;

            ProjectService.GetProjectPhases(project).then(complete).catch(error);

            function complete(result) {                
                vm.phaseList = result.data;

                vm.loadingPhases = false;
            }

            function error(result) {
                console.log('Error loading phases: ' + result);
                vm.loadingPhases = false;
            }
        }

        function LoadSubPhases(project, phase) {
            vm.loadingSubPhases = true;

            ProjectService.GetProjectPhaseSubPhases(project, phase).then(complete).catch(error);

            function complete(result) {
                vm.subPhaseList = result.data;

                vm.loadingSubPhases = false;
            }

            function error(result) {
                console.log('Error loading sub phases: ' + result);
                vm.loadingSubPhases = false;
            }
        }

        function SubmitTime() {
            alert('Not implemented.');
            $scope.$broadcast('refreshDatepickers');
        }

        function NewDateSelectedEvent(e, date) {
            console.log('LOADING NEW TIMESHEET FOR ' + date);
            LoadTimesheet(date);
        }

        function LoadTimesheet(date) {
            TimeService.GetTimesheet(date).then(complete).catch(error);

            function complete(result) {
                vm.timeSheet = {
                    project: result.data.Project,
                    phase: result.data.Phase,
                    subPhase: result.data.SubPhase,
                    comment: result.data.Comment,
                    hours: result.data.Hours,
                    overtime: 0
                };

                LoadPhases(vm.timeSheet.project);
                LoadSubPhases(vm.timeSheet.project, vm.timeSheet.phase);

                console.log('done');
            }

            function error(result) {
                console.log('Error loading timesheet: ' + result);
            }
        }
    }

})();

