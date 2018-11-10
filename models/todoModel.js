// this module is going to define what my data looks like

// require mongoose first
var mongoose = require("mongoose");

// then set up the schema
// get schema object
var Schema = mongoose.Schema;
// create new schema
var todoSchema = new Schema({
	username: String,
	todo: String,
	isDone: Boolean,
	hasAttachment: Boolean
});

// then create the new model using the schema we just created
var Todos = mongoose.model("Todos", todoSchema);

// finally export the model
module.exports = Todos;	// now we have a reusable model