const express = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fieldValidator');
const { validateJwt } = require('../middlewares/jwtValidator');
const { loginContr, renewTokenContr, createUserContr } = require('../controllers/user.controller');

const app = express.Router();

// Router: Create User
app.post(
	'/create/',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
		validateFields,
	],
	createUserContr
);

// Router: Login
app.post(
	'/login',
	[
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
		validateFields,
	],
	loginContr
);

// Router:  Renew token
app.get('/login/renew/', validateJwt, renewTokenContr);

module.exports = app;
