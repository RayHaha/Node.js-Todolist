/*
	build up api endpoints, not yet to build anny front-end,
	any actual interface to the api, just api itself.
	Api simply needs to provide the functionality and then
	really building the front-end is a seperate process.

	maybe something like router
*/
// get the todo model first
var Todos = require("../models/todoModel");		// go back one folder level
// get body-parser to parse the http request
var bodyParser = require("body-parser");

module.exports = function(app){
	// use some moddleware, make some endpoints, some api you might need
	// use body-parser to take a look at http request before we handle it
	app.use(bodyParser.json());		// parse out json
	app.use(bodyParser.urlencoded({ extended: true}));		// handle url encoded data (maybe POST)

	// get all the todos for particular person
	// :uname means that it can be a parameter that can be changed on the url
	// then get that parameter by req.params	
	app.get("/api/todos/:uname", function(req, res){
		// set the callback when this happens
		// use the .find method which is provided by mongoose
		Todos.find({ username: req.params.uname}, function(err, todos){
			// this function has an error first callback
			if (err) throw err;
			res.send(todos);	// it'll be the JavaScript object representation
		});
	});

	// get a particular todo by ID
	app.get("/api/todo/:id", function(req, res){
		// use the .findById method which is provided by mongoose
		Todos.findById(req.params.id, function(err, todo){
			// do the same thing as .find
			if (err) throw err;
			res.send(todo);
		});
	});

	// add a todo
	app.post("/api/todo", function(req, res){
		// I'm going to do two different things in this method
		// make a new one or update one
		// in this case, it'll base on the id is already existed or not
		if(req.body.id){	// req.body is what bodyparser gave me, it'll add this to the request
			// req.body will be the javascript object converted by json
			// so if there is the id, it's not new then I'll update it.
			// use the .findByIdAndUpdate which is provided by mongoose
			/* the parameters (your id, 
			{ properties that is updating: new value, properties that is updating: new value},
			error first callback function)*/
			Todos.findByIdAndUpdate(req.body.id, {
				todo: req.body.todo,
				isDone: req.body.isDone,
				hasAttachment: req.body.hasAttachment
			}, function(err, todo){
				if (err) throw err;
				// already updated, so we just send "success" back as my http response
				res.send("Success");
			});
		}else{
			// or I'll create a new one
			var newTodo = Todos({
				username: "test",	// we don't know the user yet so just use test first
				todo: req.body.todo,
				isDone: req.body.isDone,
				hasAttachment: req.body.hasAttachment
			});
			// then save
			newTodo.save(function(err){
				if (err) throw err;
				res.send("Success");
			});
		}
	});
	
	// allow to delete
	app.delete("/api/todo", function(req, res){
		// use the .findByIdAndRemove method which is provided by mongoose
		Todos.findByIdAndRemove(req.body.id, function(err){
			if (err) throw err;
			res.send("Success");
		});
	});
}