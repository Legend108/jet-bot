const Guild = require('../models/guildSchema');
const timeout = new Map();

module.exports = async (client, message) => {
	if (message.author.bot || !message.guild) return;

	const guildConf = await Guild.findOne({ guildId: message.guild.id });

	if (message.content.indexOf(guildConf.prefix) !== 0) return;

	const args = message.content
		.slice(guildConf.prefix.length)
		.trim()
		.split(/ +/g);
	const command = args.shift().toLowerCase();

	let cmd = client.commands.get(command);

	if (cmd) {
		if (cmd.timeout) {
			if (timeout.get(`timeout-${message.author.id}`)) {
				return message.reply("You are in a timeout. This command can only be used once every " + cmd.timeout + "ms");
			} else {
				try {
					cmd.exec(client, message, args);
					timeout.set(`timeout-${message.author.id}`, true);
					setTimeout(() => {
						timeout.delete(`timeout-${message.author.id}`);
					}, cmd.timeout * 1000);
				} catch (err) {
					console.error(err);
					message.reply({ content: "Seems like some error occured! Please contact <@!777236834064531467> " });
				}
			}
		} else {
			try {
				cmd.run(client, message, args);
			} catch (err) {
				message.reply({ content: "Some error occured!" });
			}
		}
	}
};
