const { Client } = require("discord.js");
const { readdirSync, readdir } = require("fs");

/*
 * @param {Client} client
*/

module.exports = async (client) => {
  let cmdFolders = readdirSync("./commands");
  cmdFolders.forEach((f) => {
    let cmdFiles = readdirSync(`./commands/${f}`).filter((file) =>
      file.endsWith(".js")
    );

    for (let file of cmdFiles) {
      const command = require(`../commands/${f}/${file}`);

      client.commands.set(command.name, command);
	  
	  if(command.aliases) {
		  client.aliases.set(command.aliases, command);
	  }

      console.log("Loaded " + command.name);
    }
  });

  readdir("./events", (err, data) => {
    if (err) throw err;
    else
      data.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`../events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`../events/${file}`)];
      });
  });

  readdir("./slashCommands", (err, data) => {
    if (err) throw err;
    else
      data.forEach((f) => {
        if (!f.endsWith(".js")) return;
        const file = require(`../slashCommands/${f}`);
        if (!file.name) return;
        if (!file.description)
          throw new Error(
            "Please provide a file description!",
            "SlashCommandPosting"
          );

        client.slashcommands.set(file.name, file);
        let fileToSend = {
          name: file.name,
          description: file.description,
        };

        if (file.args) {
          fileToSend = {
            name: file.name,
            description: file.description,
            options: file.args,
          };
        }

        client.on("ready", () => {
          client.api
            .applications(client.user.id)
            .guilds(process.env.postGuildId)
            .commands.post({
              data: fileToSend,
            });
        });
      });
  });
};
