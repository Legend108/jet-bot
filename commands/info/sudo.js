module.exports = {
  name: "sudo",
  description: "Makes a webhook, sends a message and then deletes it!",
  timeout: 5,
  aliases: ['s', 'webhook'], 
  exec: async (client, message, args) => {
    let wb = await message.channel.createWebhook(message.author.username, {
      avatar: message.author.displayAvatarURL({ dynamic: true }),
    });
    wb.send(args.join(" ") ? args.join(" ") : "No message provided!");
    setTimeout(() => {
      wb.delete();
    }, 3000);
  },
};
