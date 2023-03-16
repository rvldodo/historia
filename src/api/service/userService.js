const { Users } = require("../models");

class UserService {
	static async createUser(googleId, fullName, email, picture) {
		return Users.create({
			googleId,
			fullName,
			email,
			picture,
		});
	}

	static async findAllUsers() {
		return Users.findAll();
	}

	static async findUserByGoogleId(id) {
		return Users.findOne({ where: { googleId: id } });
	}

	static async finUserById(id) {
		return Users.findOne({
			where: { id },
		});
	}

	static async findUserByEmail(email) {
		return Users.findOne({
			where: { email },
		});
	}
}

module.exports = UserService;
