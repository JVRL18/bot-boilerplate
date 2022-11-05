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
      },
    ]);

  return embed;
};

this.kicked = (user, reason) => {
  const embed = new EmbedBuilder()
    .setTitle("KICK")
    .setDescription("User kicked!")
    .setThumbnail(user.displayAvatarURL())
    .setColor("#FFC42E")
    .addFields([
      {
        name: "Name:",
        value: user.username,
      },
      {
        name: "Reason:",
        value: `\`\`\`${reason}\`\`\``,
      },
    ]);

  return embed;
};
