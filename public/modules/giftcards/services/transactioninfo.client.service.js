'use strict';

angular.module('giftcards').factory('Transactioninfo', [
	function()
	{
		//Check out this for doing this http://stackoverflow.com/questions/29150521/using-getter-setter-methods-in-angularjs-factory
		var transaction =
		{
	        Transactioninfo: function ()
			{
	            return new DataObject();
	        }
    	};

    return service;

    function DataObject(data)
	{
        if(data) {
            this.bday = data[0];
            this.phys = data[1];
            this.fname = data[2];
            this.lname = data[3];
        }

        this.getFirstName = function ()
		{
            return this.fname || null;
        }
    }
	}
]);
