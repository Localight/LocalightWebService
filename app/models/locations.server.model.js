'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Business Locations, this is the location a merchant could own. It contains an address, and geolocation, and
// the tricon the store uses. Merchant's will have tricon's based on location.

/**
 * Business Location Schema,
 */

var BusinessLocationSchema = new Schema({

   nameOfStore: {
      type: String,
      require:'Please provide the name of the location'
   },
   buildingNumber:{
      type:Number,
      required:'Please provide building Number'
   },
   streetName:{
      type:String,
      require: 'Please provide a Street Name.'
   },
   zipcode:{
      type:Number,
      max:5
   },
   suiteNumber:{
      type:Number
   },
   // geoLocation:{
   // }
   merchantId:{
      type: Schema.ObjectId,
      ref: 'User',
      required:'Please, Enter the id of a valid User'
   }
});
