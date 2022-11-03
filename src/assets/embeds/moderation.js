const { EmbedBuilder } = require("discord.js");

this.kick = (user, reason) => {
  const embed = new EmbedBuilder()
    .setTitle("KICK")
    .setDescription("Are you sure you want to kick this user?")
    .addFields(
      {
        text: "Name:",
        value: user.username,
      },
      {
        text: "Reason:",
        value: `\`\`\`${reason}\`\`\``,
      }
    )
    .setColor("#FFC42E");
  return embed;
};
