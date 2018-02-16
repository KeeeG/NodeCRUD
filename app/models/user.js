var mongoose = require('mongoose');
module.exports = mongoose.model('User', {
	firstName : String,
	lastName : String,
	email : String
});
