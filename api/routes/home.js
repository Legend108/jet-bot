module.exports = {
	path: "/home",
	route: (req, res, client) => {
		res.render('index', {
			bot: client,
		});

		console.log(client.user.username);
	}
}
