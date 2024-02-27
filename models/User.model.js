const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	name: String,
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	
	lastactive: {
		name: String,
		index: Number,
		isActive: Boolean
	},
	categories: [{type: String}],
	activities: [{
		name: String,
		timer: [{start: Date, end: Date}]
	}],
});

module.exports = model("User", userSchema);