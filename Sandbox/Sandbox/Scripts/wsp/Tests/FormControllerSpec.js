(function () {
    'use strict';

    describe('FormController tests', function () {
        var $controller;
        var $rootScope;
        var q;

        beforeEach(module('myApp'));
        beforeEach(inject(function (_$rootScope_, _$controller_, $q) {
            $controller = _$controller_;
            q = $q;
            $rootScope = _$rootScope_;
        }));

        describe('Scope value defaults', function () {
            it('has a test value', function () {
                var EmployeeService = {};
                var controller = $controller('FormController', { EmployeeService: EmployeeService });

                expect(controller.test).toEqual('123');
            });
        });

        describe('SubmitForm', function () {
            it('sets message', function () {
                var EmployeeService = {};

                EmployeeService.SubmitEmployee = function (e) {
                    var deferred = q.defer();
                    deferred.resolve("result");
                    return deferred.promise;
                };
                var controller = $controller('FormController', { EmployeeService: EmployeeService });

                controller.SubmitForm();
                $rootScope.$digest();

                expect(controller.message).toEqual('result');
            });
        });
    });
})();


