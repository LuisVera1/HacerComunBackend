const jwt = require('jsonwebtoken');

const generateJWT = (id, name) => {
	return new Promise(async (resolve, reject) => {
		const payload = { id, name };

		try {
			await jwt.sign(
				payload,
				process.env.SECRET_JWT_SEED,
				{
					expiresIn: '2h',
				},
				(err, token) => {
					if (err) {
						console.log(err);
						reject('No se pudo generar el token');
					}
					resolve(token);
				}
			);
		} catch (err) {
			console.error('error al generar el token');
			console.error(err);
		}
	});
};

module.exports = {
	generateJWT,
};
