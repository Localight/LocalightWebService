// I'm doing this based on what i've seen in another project, i'm not sure if this actually correct or not

'use strict';

var balanced = require('balanced-offical');

exports.init = function(apiKey){
  balanced.configure(apiKey);
};
