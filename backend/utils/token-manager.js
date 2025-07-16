const jwt = require("jsonwebtoken");
const { COOKIE_NAME } = require("./constants");

exports.createToken = (id, email, expiresIn) => {
	const payload = { id, email };
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

exports.verifyToken = (req, res, next) => {
	const token = req.signedCookies[COOKIE_NAME]; 
	

	if (!token) {
		console.log('Signed Cookies: ', req.signedCookies);
		console.log('Cookies:', req.cookies);
		return res.status(401).json({ message: "Unauthorized: No token provided" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		res.locals.jwtData = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Unauthorized: Invalid token" });
	}
};
