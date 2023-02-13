const { response } = require('express');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../middlewares/jwt');
const userModel = require('../models/user.model');

//Create user
const createUserContr = async (req, res) => {
	let { email, name, password } = req.body;

	try {
		//Search if the user alredy exist
		let user = await userModel.findOne({ email: email });

		if (user) {
			return res.status(400).json({ msg: 'User alredy exist' });
		}

		//Encrypt password
		const salt = bcrypt.genSaltSync();
		const encryptedPassword = bcrypt.hashSync(password, salt);

		//Create new user
		const data = {
			email,
			name,
			password: encryptedPassword,
		};

		user = await userModel.create(data);

		//Generate token
		const token = await generateJWT(user.id, user.name);

		const response = {
			status: 'User has been created',
			id: user.id,
			name: user.name,
			token,
		};

		return res.status(201).json(response);
	} catch (err) {
		return res.status(500).json(err);
	}
};

//Login
const loginContr = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		let user = await userModel.findOne({ email: email });

		//Validate if user exist
		if (!user) {
			return res.status(400).json({ msg: 'user does not exist' });
		}

		//Validate password
		const validPassword = bcrypt.compareSync(password, user.password);

		if (!validPassword) {
			return res.status(400).json({ msg: 'Password is not valid' });
		}

		//Generate JWT when user and password are valid
		const token = await generateJWT(user.id, user.name);
		return res.status(200).json({
			msg: 'successful login',
			id: user.id,
			name: user.name,
			email: user.email,
			token,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ msg: 'Something is wrong with the login' });
	}
};

//Renew Token
const renewTokenContr = async (req, res) => {
	const id = req.id;
	const name = req.name;

	try {
		//Generate new token and return it
		const token = await generateJWT(id, name);

		const response = {
			msg: 'Token renewed',
			id,
			name,
			token,
		};

		res.status(200).json(response);
	} catch (err) {
		return res.status(500).json(err);
	}
};

//Edit info
const editInfo = async (req, res) => {
	const data = req.body;

	//TODO: ------------------------------------ recive email from frontend
	const email = 'luisvera@gmail.com';

	try {
		const updatedUser = await userModel.findOneAndUpdate({ email: email }, data);

		return res.status(202).json(updatedUser);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const addbag = async (req, res) => {
	const item = req.body;
	const idUser = req.query.idUser;

	try {
		//TODO: ------------------------------------ recive idUser from frontend
		const bag = await userModel.findByIdAndUpdate(idUser, { $push: { bag: item } });

		return res.status(201).json(item);
	} catch (err) {
		return res.status(500).json(err);
	}
};

module.exports = {
	createUserContr,
	loginContr,
	renewTokenContr,
	editInfo,
	addbag,
};
