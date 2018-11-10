// get config.json first
var configValues = require("./config");	// it'll look for .js or .json itself

// you might encrypt the user information in config.json first
// then it might be a decrypt function here to decrypt the user information in the real environment
// then send to the getDbConnectionString function

// then export the object
module.exports = {
	getDbConnectionString: function(){
		// in my case, I built mongodb on my computer, so I'll connect to localhost
		// it fail, I try to use the db from mlab first then figure out the question
		// finally, mlab work. So the error came from localhost mongodb
		return "mongodb://" + configValues.uname + ":" + configValues.pwd 
		+ "@ds017736.mlab.com:17736/nodetodosample";
	}
}
// when require the config from outside the config folder,
// we'll get this object with the method on it
// which return the connection string to the database