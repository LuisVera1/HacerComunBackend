const { response } = require('express');
const { createUser, loginUser } = require('../usescases/user.usecase');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../middlewares/jwt');

const loginContr = async (req, res = response) => {
	const { email, password } = req.body;

	const response = await loginUser({ email, password });

	res.status(response.status).json(response.body);
};

const renewContr = async (req, res) => {
	const id = req.id;
	const name = req.name;

	//generate new token and return it
	const token = await generateJWT(id, name);

	const response = {
		endpoint: 'renew',
		id,
		name,
		token,
	};

	res.status(200).json(response);
};

const createContr = async (req, res) => {
	let { email, name, password } = req.body;

	//encrypt password
	const salt = bcrypt.genSaltSync();
	password = bcrypt.hashSync(password, salt);

	const response = {
		email,
		name,
		password,
	};

	const user = await createUser(response);

	res.json(user);
	res.status(201);
};

module.exports = {
	loginContr,
	renewContr,
	createContr,
};

//mandar status correcto en create usuario
//mandar status correcto en login
//paasar bcryot a usecase
