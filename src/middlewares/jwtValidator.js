const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJwt = async (req, res = response, next) => {
	const token = req.header('x-token');

	//Check if token exist
	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No hay token en la peticion',
		});
	}

	//Validate token
	try {
		const payload = await jwt.verify(token, process.env.SECRET_JWT_SEED);

		req.id = payload.id;
		req.name = payload.name;
	} catch (err) {
		return res.status(401).json({
			ok: false,
			msg: 'Token no valido',
		});
	}

	next();
};

module.exports = { validateJwt };
