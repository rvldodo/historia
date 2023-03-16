require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
	const token = jwt.sign({ user: payload }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1h",
	});
	return token;
};

const verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		return decoded;
	} catch (error) {
		return null;
	}
};

module.exports = { generateToken, verifyToken };
