const express = require('express');
const {
	getAllItems,
	getByFilter,
	getItemById,
	createItem,
	updateItem,
	deleteItem,
} = require('../controllers/item.controller');

const router = express.Router();

//Router: Get all items
router.get('/shop', getAllItems);

//Router: Get by category
router.get('/filter', getByFilter)

//Router: Get One item
router.get('/item', getItemById);

//Router: Create new item
router.post('/newitem', createItem);

//Router: Update Item
router.patch('/updateitem', updateItem);

//Router: Delete Item
router.delete('/deleteitem', deleteItem);

module.exports = router;
