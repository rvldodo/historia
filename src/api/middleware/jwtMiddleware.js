const UserService = require("../service/userService");
const { generateToken, verifyToken } = require("../utils/jwt");

class Middleware {
	static async authLogin(req, res, next) {
		const { email } = req.body;
		try {
			const user = await UserService.findUserByEmail(email);

			const payload = {
				googleId: user.googleId,
				email: user.email,
			};

			const token = generateToken(payload);

			return res.json({ token });
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	static async tokenVerify(req, res, next) {
		try {
			const bearer = req.headers["authorization"];
			if (!bearer) return res.status(403).json("Unauthorized");
			const token = bearer.split(" ")[1];

			if (!token || token === null) return res.status(403).json("Unauthorized");

			const payload = verifyToken(token);

			const user = await UserService.findUserByGoogleId(payload.user.googleId);

			if (!user || user === null) return res.status(404).json("User not found");

			next();
		} catch (err) {
			console.log(err);
			next(err);
		}
	}
}

module.exports = Middleware;
