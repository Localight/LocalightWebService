'use strict';
angular.module('giftcards').directive('datePicker', [function() {
  return {
    restrict: 'A',

     link: function(scope, element) {
			$(element).datepicker();
    //   element.pickadate({
    //     min: new Date(), // minimum date = today
    //     max: +365, // maximum date = 1 year from now
    //     clear: '', // disable 'Clear' button
    //     format: 'Sen!d on mmm. dd, yyyy', // use '!' to escape any "rule" characters
    //     onSet: function() {
    //       var date = this.get('select', 'yyyy-mm-dd'); // 'this' refers to element.pickadate()
    //       scope.$apply(function() {
    //         scope.formData.Date = date;
    //       });
    //     },
    //     onClose: function() {
    //       element.blur(); // remove focus from input element
    //     }
    //   });
		//
    //   var picker = element.pickadate('picker');
		//
    //   // when "Send Today" is clicked, set picker to Today, but don't open the popup
    //   $('#sendToday').on('click', function(event) {
    //     picker.set('select', new Date()); // set picker to today --> triggers onSet()
    //   });
		//
    //   // when "Send On Date" is clicked, remove 'nextInput' class and open picker
    //   $('#sendOnDate').on('click', function(event) {
    //     $('#clique_date_wrapper').removeClass('nextInput');
    //     picker.open();
    //     event.stopPropagation(); // stop click event outside of input from triggering picker.close()
    //   });
     }
  };
}]);
