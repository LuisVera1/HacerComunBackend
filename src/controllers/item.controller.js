const itemModel = require('../models/item.model');

const getAllItems = async (req, res) => {
	try {
		const items = await itemModel.find();
		return res.status(200).json(items);
	} catch (err) {
		return res.status(500).json({ err });
	}
};

const getByFilter = async (req, res) => {
	const filter = req.query.category;

	try {
		const dataFiltered = await itemModel.find({ category: filter });

		return res.status(200).json(dataFiltered);
	} catch (err) {
		return res.status(500).json({ err });
	}
};

const getItemById = async (req, res) => {
	const id = req.query.id;

	try {
		const items = await itemModel.findById(id);

		//If items does not exist
		if (!items) {
			return res.status(400).json({ msg: 'Item not found' });
		}

		//If item exist
		return res.status(200).json(items);
	} catch (err) {
		return res.status(500).json({ err });
	}
};

//Todo *** validation for existing sku ***
const createItem = async (req, res) => {
	const data = req.body;
	try {
		const newITem = await itemModel.create(data);

		return res.status(201).json(newITem);
	} catch (err) {
		return res.status(500).json({ err });
	}
};

const updateItem = async (req, res) => {
	const id = req.query.id;
	const data = req.body;

	try {
		const updateItem = await itemModel.findByIdAndUpdate(id, data);
		return res.status(202).json(updateItem);
	} catch (err) {
		return res.status(500).json({ err });
	}
};

const deleteItem = async (req, res) => {
	const id = req.query.id;

	try {
		const deleteItem = await itemModel.findByIdAndDelete(id);

		return res.status(200).json({ msg: 'item deleted' });
	} catch (err) {
		return res.status(500).json({ err });
	}
};

module.exports = {
	getAllItems,
	getByFilter,
	getItemById,
	createItem,
	updateItem,
	deleteItem,
};
