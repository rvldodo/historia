const UserService = require("../service/userService");

class Data {
	static async getAllData(req, res) {
		try {
			const users = await UserService.findAllUsers();

			if (users.length === 0) {
				return res.status(404).json({
					message: "There is no users data",
				});
			} else {
				return res.json({
					message: "Successfully get data",
					data: users,
				});
			}
		} catch (err) {
			console.log(err);
		}
	}

	static async getDataById(req, res) {
		const { id } = req.params;

		try {
			const user = await UserService.finUserById(id);

			if (!user || user === null) return res.json("User not found").status(404);

			return res.json({
				message: "Success get data",
				user,
			});
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = Data;
