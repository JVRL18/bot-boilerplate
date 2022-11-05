const { EmbedBuilder } = require("discord.js");

const pallete = "#7600bc";
const loadingURL =
  "https://cdn.dribbble.com/users/2105727/screenshots/4254712/getting_ready.gif";

this.justAText = (text, color) => {
  const embed = new EmbedBuilder()
    .setColor(color === undefined ? pallete : color)
    .setFooter({ text: text });
  return embed;
};

this.noPerm = () => {
  const embed = new EmbedBuilder()
    .setDescription("Hey! You don't have permission to do that!")
    .setColor("#FFC42E");

  return embed;
};

this.embed_404_user = (text) => {
  const embed = new EmbedBuilder()
    .setColor("FF0000")
    .setDescription(`❌ Ops, user ${text} don't exist.`);

  return embed;
};

this.await_fetching = (what) => {
  const embed = new EmbedBuilder()
    .setColor("#FFC42E")
    .setDescription(`⏳ searching in DataBase wait a moment...`)
    .setImage(loadingURL);

  return embed;
};

this.embed_404_error_message = (text) => {
  const embed = new EmbedBuilder()
    .setColor("FF0000")
    .setDescription(`❌ Ops, ${text}.`);

  return embed;
};
