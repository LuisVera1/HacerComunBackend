// Import mongoose
const mongoose = require('mongoose');

// Creating schema
const itemSchema = new mongoose.Schema({
	category: String,
	sku: String,
	price: Number,
	// images: [String],
	video: String,
	esp: {
		name: String,
		description: String,
		// 	dimensions: String,
		// 	material: String,
		// 	variations: String,
		// 	handle: String,
		// 	info: String,
		// 	leadTime: Number,
	},
	eng: {
		name: String,
		description: String,
		// 	dimensions: String,
		// 	material: String,
		// 	variations: String,
		// 	handle: String,
		// 	info: String,
		// 	leadTime: Number,
	},
});

// Creating model
const item = mongoose.model('products', itemSchema);

// Exports
module.exports = item;
