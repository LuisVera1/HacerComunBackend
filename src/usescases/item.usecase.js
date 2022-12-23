const item = require('../models/item.model');

async function getAllItems() {
	const list = await item.find();
	return list;
}

async function createItem(inputName) {
	const newItem = inputName;
	return await item.create(newItem);
}

async function readItemById(id) {
	const SelectedItem = await item.findById(id);
	return SelectedItem;
}

async function updateItem(id, data) {
	await item.findByIdAndUpdate(id, data);
	const updatedItem = await item.findById(id);
	return updatedItem;
}

async function deleteItemById(id) {
	const deleted = await item.findByIdAndDelete(id);
	return deleted;
}

module.exports = {
	getAllItems,
	createItem,
	readItemById,
	updateItem,
	deleteItemById,
};
