const UserService = require("../service/userService");

class PassportController {
	static async register(accessToken, refreshToken, profile, done) {
		const { id, displayName, emails, photos } = profile;

		try {
			let user = await UserService.findUserByGoogleId(id);

			if (user) {
				done(null, user);
			} else {
				user = await UserService.createUser(
					id,
					displayName,
					emails[0].value,
					photos[0].value
				);

				done(null, user);
			}
		} catch (err) {
			console.log(err);
			done(err);
		}
	}

	static async loginUser(req, email, password, done) {
		try {
			console.log(req.body);

			const user = await UserService.findUserByEmail(email);

			if (user === null) {
				return done(null, false, { message: "User not found" });
			}

			return done(null, user, { message: "Login successful" });
		} catch (err) {
			console.log(err);
			done(err);
		}
	}

	static async tokenUser(token, done) {
		try {
			return done(null, token.user);
		} catch (err) {
			console.log(err);
			return done(err);
		}
	}
}

module.exports = PassportController;
