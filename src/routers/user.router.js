const express = require('express');
const { check } = require('express-validator');
const { loginContr, renewContr, createContr } = require('../controllers/user.controller');
const { validateFields } = require('../middlewares/fieldValidator');
const { validateJwt } = require('../middlewares/jwtValidator');

const app = express.Router();

app.post(
	'/login',
	//middlewares: express validator
	[
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
		validateFields,
	],
	loginContr
);

app.get('/login/renew/', validateJwt, renewContr);

app.post(
	'/create/',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
		validateFields,
	],
	createContr
);

module.exports = app;
