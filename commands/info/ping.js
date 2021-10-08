module.exports = {
  name: "ping",
  description: "Sends the bot latency!",
  timeout: 3,
  aliases: ['latency'], 
  exec: async (client, message, args) => {
	message.reply("My latency is: " + client.ws.ping + "ms");
  },
};
