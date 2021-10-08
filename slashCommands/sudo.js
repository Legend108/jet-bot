const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "embed",
  description: "Test command for slash",
  args: [
    {
      name: "name",
      description: "Your name!",
      type: 3,
      required: true,
    },
    {
      name: "age",
      description: "Your age",
      type: 4,
      required: true,
    },
    {
      name: "nation",
      description: "Your nationality!",
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    interaction.followUp({
      embeds: [
        new MessageEmbed().setDescription(
          `Your name is ${args[0]}\nYour age is ${args[1]}\nYour nation is ${args[2]}`
        ),
      ],
    });
  },
};
