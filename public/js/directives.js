'use strict';

/* Directives */

angular.module('bloomboard.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });
