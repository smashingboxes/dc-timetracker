'use strict';
define([
    'angular',
    'components/components'
], angular => {
    function FocusDirective() {
        return (scope, elem) => {
            elem.focus();
        };
    }

    angular.module('flash.components')
        .directive('pFocus', FocusDirective);
});
