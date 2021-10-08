const Guild = require('../models/guildSchema');

module.exports = async(client, guild) => {
	const data = await Guild.findOneAndUpdate({ guildId: guild.id }, {
		prefix: process.env.prefix,
		guildId: guild.id,
	}, {
		upsert: true,
	}).then(console.log("Joined the guild " + guild.name + " and data saved to mongoDB")).catch(console.error);
}
