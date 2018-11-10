// get config.json first
var configValues = require("./config");	// it'll look for .js or .json itself

// it might be a decrypt function here to decrypt the user information in the real environment
// then send to the getDbConnectionString function

// then export the object
module.exports = {
	getDbConnectionString: function(){
		// in my case, I built mongodb on my computer, so I'll connect to localhost
		return "mongodb://" + configValues.uname + ":" + configValues.pwd 
		+ "127.0.0.1:27017/nodetodosample";
	}
}
// when require the config from outside the config folder,
// we'll get this object with the method on it
// which return the connection string to the database