//import model
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../middlewares/jwt');

async function createUser(data) {
	//Search if user is registered
	let user = await userModel.findOne({ email: data.email });

	if (user) {
		return {
			status: 'El usuario ya existe',
			id: user.id,
			name: user.name,
		};
	}

	//Create new user
	user = await userModel.create(data);

	//Generate JWT
	const token = await generateJWT(user.id, user.name);

	return {
		status: 'El usuario se ha creado',
		id: user.id,
		name: user.name,
		token,
	};
}

async function loginUser(input) {
	try {
		//validate user (email)
		let usuario = await userModel.findOne({ email: input.email });

		if (!usuario) {
			return {
				status: 400,
				body: {
					msg: 'No existe usuario con ese mail',
				},
			};
		}

		//validate password
		const validPassword = bcrypt.compareSync(input.password, usuario.password);

		if (!validPassword) {
			return {
				status: 400,
				body: {
					msg: 'La contraseña no es valida',
				},
			};
		}

		//Gnerate JWT
		const token = await generateJWT(usuario.id, usuario.name);

		return {
			status: 200,
			body: {
				msg: 'login correcto',
				id: usuario.id,
				name: usuario.name,
				email: usuario.email,
				token,
			},
		};
	} catch (err) {
		//Error!
		console.error(err);
		return {
			status: 500,
			body: {
				msg: 'Hable con el administrador',
			},
		};
	}
}

module.exports = {
	createUser,
	loginUser,
};
