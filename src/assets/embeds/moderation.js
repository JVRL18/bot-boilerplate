const { EmbedBuilder } = require("discord.js");

this.kick = (user, reason) => {
  const embed = new EmbedBuilder()
    .setTitle("KICK")
    .setDescription("Are you sure you want to kick this user?")
    .setColor("#FFC42E")
    .addFields([
      {
        name: "Name:",
        value: user.username,
      },
      {
        name: "Reason:",
        value: `\`\`\`${reason}\`\`\``,
      }]
    )
    
  return embed;
};
