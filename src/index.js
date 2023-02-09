//Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//Import router file
const item = require('./routers/item.router.js');
const user = require('./routers/user.router.js');

//Environment variables
const URI = process.env.URI;
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use('/', item);
app.use('/users/', user);

// Run server and connect to DB
mongoose
	.connect(URI)
	.then(() => {
		console.log('Database connection successful');

		app.listen(PORT, () => {
			console.log('Server running on port:', PORT);
		});
	})
	.catch((error) => {
		console.error('Something is wrong:', error);
	});
