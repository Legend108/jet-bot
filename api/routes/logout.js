module.exports = {
	path: "/logout",
	checkAuth: true,
	route: (req, res) => {
		req.logout();
		res.redirect("/home");
	}
}
