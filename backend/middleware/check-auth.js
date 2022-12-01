const HttpError = require("../models/http-error");
const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
	if(req.method === 'OPTIONS'){
		return next();
	}
	try {
		const token = req.headers.authorization.split(' ')[1];
		
		if(!token){
			throw new Error();
		}

		const deCoded = jwt.verify(token, 'super_secret_dont_share');

		req.userData = {userId: deCoded.userId};
		next();
		
	} catch (error) {
		return next(new HttpError('Invalid Request', 401));

	}

}