const mongoose = require('mongoose');

module.exports = async(client) => {
	const dash = require('../api');
	dash.dashboard(client);

	console.log(
		`Logged in as ${client.user.tag}`
	);

	await mongoose.connect(process.env.mongoURL).then(console.log("MongoDB Connected")).catch(console.error);
};
