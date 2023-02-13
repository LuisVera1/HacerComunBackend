// Import mongoose
const mongoose = require('mongoose');

// Creating schema
const itemScheme = new mongoose.Schema({
	category: String,
	sku: {
		type: String,
		unique: true,
		required: true,
	},
	price: Number,
	images: [String],
	video: String,
	esp: {
		name: String,
		description: String,
		dimensions: String,
		material: String,
		variations: String,
		handle: String,
		info: String,
		leadTime: Number,
	},
	eng: {
		name: String,
		description: String,
		dimensions: String,
		material: String,
		variations: String,
		handle: String,
		info: String,
		leadTime: Number,
	},
});

// Creating model
const itemModel = mongoose.model('product', itemScheme);

// Exports
module.exports = itemModel;
