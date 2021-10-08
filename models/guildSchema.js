const { Schema, model } = require('mongoose');

const guild = new Schema({
	prefix: {
		type: String,
		default: process.env.prefix,
		required: true,
	},
	guildId: {
		type: String,
		required: true,
	}
});

module.exports = model('guild', guild);
