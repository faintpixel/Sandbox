(function () {
    'use strict';

    angular.module('myApp').controller('AboutController', AboutController);

    function AboutController() {
        var vm = this;

        vm.buildNumber = '1.323232';        
    }

})();

