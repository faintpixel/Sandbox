/**
 * Decorates the ui-bootstrap datepicker. Calls a function when the month changes.
 * Mostly taken from: http://stackoverflow.com/questions/30849235/angular-bootstrap-datepicker-change-month-event
 */
angular.module('ui.bootstrap.datepicker')
    .config(function ($provide) {
        $provide.decorator('uibDatepickerDirective', function ($delegate) {
            var directive = $delegate[0];
            var link = directive.link;

            directive.compile = function () {
                return function (scope, element, attrs, ctrls) {
                    link.apply(this, arguments);

                    scope.$watch(function () {
                        return ctrls[0].activeDate;
                    }, function (newValue, oldValue) {
                        if (oldValue.getMonth() !== newValue.getMonth() || oldValue.getYear() !== newValue.getYear()) {
                            scope.$parent.$broadcast('datepickerMonthChanged', newValue.getMonth() + 1);
                        }
                    }, true);
                }
            };
            return $delegate;
        });
    });