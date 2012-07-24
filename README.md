
# Sample app integrating jQuery UI DatePicker with AngularJS


## Objectives

* Button click invokes a controller method, which triggers the display of a datepicker control positioned next to the button
* Select a date in DP invokes a method on controller
* Ability to show/hide the DP control from a controller
* Ability to update DP options on the fly


## Usage

### Directive

       jqui-datepicker

   This tag does not have content.

   Example:

       <jqui-datepicker ....></jqui-datepicker>


### Attributes

* __model__ (optional)

  Expression holding the date being selected.

  Example:

            <jqui-datepicker model='selectedDate'></jqui-datepicker>

* __show__ (optional)

  Expression indicating if the control must be displayed or hidden. If omitted, the control is by default displayed.

  Example:

            <jqui-datepicker show='isVisible()'></jqui-datepicker>



* __selected__ (optional)

  Expression evaluated each time a date is being selected by the user.

  Example:

            <jqui-datepicker selected='dateSelected()'></jqui-datepicker>



* __options__ (optional)

  Once evaluated, this expression should return an object used as a base for the DatePicker control options.

  Example:

            <jqui-datepicker options='datePickerOptions'></jqui-datepicker>
