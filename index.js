const { Client, Collection, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

module.exports = client;

client.commands = new Collection();
client.slashcommands = new Collection();
client.aliases = new Collection();
client.config = process.env;

require("./handler/command")(client);

client.login(client.config.TOKEN);
