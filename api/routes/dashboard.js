const { Permissions } = require("discord.js")

module.exports = {
	path: "/dashboard",
	checkAuth: true,
	route: (req, res, client) => {
		res.render('dashboard', {
			user: req.user,
			bot: client,
			permissions: Permissions,
		});
	}
}
