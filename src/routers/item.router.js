const express = require('express');
const usesItem = require('../usescases/item.usecase');

const router = express.Router();

// res.setHeader('Content-Type', 'application/json');
// res.setHeader('Access-Control-Allow-Origin', '*');

router.get('/tienda', async (req, res) => {
	try {
		const id = req.query.id;
		let items;

		if (id) {
			items = await usesItem.readItemById(id);
		} else {
			items = await usesItem.getAllItems();
		}
		res.json(items);
		res.status(200);
	} catch (err) {
		res.status(500);
		res.json({ err });
	}
});

router.post('/newitem', async (req, res) => {
	try {
		const data = req.body;
		const newUser = await usesItem.createItem(data);

		res.json(newUser);
		res.status(201);
	} catch (err) {
		res.status(500);
		res.json({ err });
	}
});

router.patch('/updateitem/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const updateData = req.body;
		const updatedItem = await usesItem.updateItem(id, updateData);

		res.json(updatedItem);
		res.status(202);
	} catch (err) {
		res.status(500);
		res.json({ err });
	}
});

router.delete('/delete/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const deleted = await usesItem.deleteItemById(id);

		res.json(deleted);
		res.status(202);
	} catch (err) {
		res.status(500);
		res.json({ err });
	}
});

module.exports = router;
