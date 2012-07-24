'use strict';


// Declare app level module which depends on filters, and services
var appModule = angular.module('myApp', []);


appModule.controller('PickerCtrl', ['$scope', '$log', function($scope, $log) {
	$scope.showDatePicker = false;

	$scope.picker2options = {
		minDate: +1
	};

	$scope.buttonClicked = function() {
//		$scope.showDatePicker = true;
		$scope.showDatePicker = !$scope.showDatePicker;
	};

	$scope.dateSelected = function() {
		$log.log("SELECTED: "+$scope.selectedDate);

		// some logic to showcase closing the control from here
		var date = new Date( Date.parse($scope.selectedDate) );
		if (date.getMonth() < 7)
			$scope.showDatePicker = false;
	};

	$scope.date2Selected = function() {
		$log.log("SELECTED2: "+$scope.selectedDate2);

		// showcase updating the datepicker options on the fly.
		// the object is being watched so we need to reasign the object to trigger the watch function as opposed to updating an element of the object.
		$scope.picker2options = jQuery.extend({}, $scope.picker2options, { minDate: new Date(Date.parse($scope.selectedDate2)) });
	}
}]);


appModule.directive('jquiDatepicker', function($log) {

	return {
		restrict: 'E',
		link: function(scope, elm, attrs) {
			// Lookup attrributes
	    	var model = attrs.model || null;
	    	var fnSelected = attrs.selected || null;
	    	var show = attrs.show || null;
	    	var options = attrs.options || null;

	    	var baseOptions = scope.$eval(options) || null;
	    	var dpCtrl = null;

	    	// init model to null
	    	scope[model] = null;

	    	// return an object with options for the datepicker control
	    	function buildOptions() {
				var opts = baseOptions || {};
				opts.onSelect = function(dateText, inst) { 
					if (model)
						scope[model] = dateText;
					if (fnSelected)
						scope.$apply(fnSelected);
				};

				opts.onClose = function(dateText, inst) {
					closePicker();
				};

				return opts;
	    	}

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
				dpCtrl.datepicker( buildOptions() );
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

	    	if (options) {
				scope.$watch(options, function(newOptions) {
					if (dpCtrl) {
						// update our baseOptions object
						baseOptions = newOptions;
						dpCtrl.datepicker('option', buildOptions());
					}
				});
	    	}
		}
	};

});