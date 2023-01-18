// Import mongoose
const mongoose = require('mongoose');

// Creating schema
const userSchema = new mongoose.Schema({
	name: String,
	lastName: String,
	email: {
		type: String,
		required: true,
		unique: true,
		minLength: 5,
		maxLength: 320,
	},
	password: {
		type: String,
		required: true,
	},
	address: {
		country: { type: String, minLength: 3, maxlength: 100 },
		nameStreet: { type: String, minLength: 3, maxlength: 100 },
		number: { type: Number, min: 0, max: 99999 },
		postalCode: { type: String, minlength: 3, maxlength: 10 },
		tel: { type: String, minLength: 10, maxlength: 10 },
		reference: { type: String, minlength: 0, maxlength: 200 },
	},
	bag: [
		{
			product: String,
			id: String,
		},
	],
	purchases: [
		{
			date: Date,
			amount: Number,
			items: [
				{
					name: String,
					pieces: Number,
					id: String,
					price: Number,
				},
			],
		},
	],
});

// Creating model
const userModel = mongoose.model('user', userSchema);

// Exports
module.exports = userModel;
