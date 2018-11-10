// add the seed data -> create some todo and add them to the database
var Todos = require("../models/todoModel");
/*
"../" is going to take back one folder level 
"./" means the same folder
*/

// the "app" is the express app, you have to pass into it when you require the controller
module.exports = function(app){
	// add an endpoint, api endpoint
	app.get("/api/setupTodos", function(req, res){

		// seed database
		var starterTodos = [
			{
				username: "test",
				todo: "Buy milk",
				isDone: false,
				hasAttachment: false
			},
			{
				username: "test",
				todo: "Feed dog",
				isDone: false,
				hasAttachment: false
			},
			{
				username: "test",
				todo: "Learn Node",
				isDone: false,
				hasAttachment: false	
			}
			// for testing, you can use the "Json generator"
		]
		// then create the seed data
		Todos.create(starterTodos, function(err, results){
			// the function is an error first callback
			res.send(results);
		});
	});
}

/*
	Endpoint:
	An endpoint just means one particular URL that's part of a API
	sometimes endpoint dose multiple things by making choice based on
	the HTTP request headers.
	So, in the HTTP request, it might put the data with one header,
	it might give me or delete the data with other headers.
	It always look at the HTTP header and decides what to do with the request object
*/