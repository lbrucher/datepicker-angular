'use strict';

var appModule = angular.module('myApp', []);


appModule.controller('PickerCtrl', ['$scope', '$log', function($scope, $log) {
	$scope.showDatePicker = false;

	$scope.buttonClicked = function() {
		$scope.showDatePicker = !$scope.showDatePicker;
	};
}]);


appModule.directive('jquiDatepicker', function($log) {
	return {
		restrict: 'E',
		link: function(scope, elm, attrs) {
	    	var show = attrs.show || null;
	    	var model = attrs.model || null;
	    	var dpCtrl = null;

	    	// init model to null
	    	scope[model] = null;

	    	// close picker control and remove any related DOM elements 
	    	function closePicker() {
	    		if (dpCtrl) {
	    			dpCtrl.datepicker('destroy');
	    			dpCtrl.remove();
	    			dpCtrl = null;
	    		}
	    	}

	    	// create and show datepicker control
	    	function openPicker() {
				elm.append('<div class="datepicker"></div>');
				dpCtrl = elm.find('.datepicker');
				dpCtrl.datepicker({
					onSelect: function(dateText, inst) { 
						if (model) {
							scope.$apply(model+"='"+ dateText+"'");
						}
					}
				});
	    	}

	    	// defines a watch on the show attribute, if one was provided.
	    	// otherwise, always display the control
	    	if (show) {
				scope.$watch(show, function(show) {
					if (show) {
						openPicker();
					}
					else {
						closePicker();
					}
				})
	    	}
	    	else {
				openPicker();
	    	}
		}
	};

});