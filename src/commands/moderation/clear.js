const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const { noPerm } = require("../../assets/embeds/global");

const code = async (i, client, many, typo) => {
  if (!i.member.permissions.has(PermissionsBitField.Flags.ManageMessages))
    return await i.reply({
      embeds: [noPerm()],
      ephemeral: true,
    });

  if (isNaN(many) || !many || many == 0 || many > 100)
    return i.reply({
      content: "You must provide a valid number between 1 and 100",
      ephemeral: true,
    });

  let fetched = many + 1;

  if (typo === "message") {
    await i.channel.bulkDelete(fetched, true)?.catch(console.error);
    i.channel.send({ content: `${many} have been deleted.` }).then((m) => {
      setTimeout(function () {
        m.delete()?.catch();
      }, 4000);
    });
  } else if (typo === "interaction") {
    await i.channel.bulkDelete(many, true)?.catch(console.error);
    i.editReply({ content: `${many} have been deleted.` }).then((m) => {
      setTimeout(function () {
        m.delete()?.catch();
      }, 4000);
    });
  }
};
module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear the chat")
    .addNumberOption((opt) =>
      opt
        .setName("quantity")
        .setDescription("How many messages to clear")
        .setRequired(true)
    ),
  aliases: ["cc"],
  run: async (interaction, client, typo) => {
    const fetched = interaction.options.getNumber("quantity");
    interaction.deferReply({ fetchReply: true });
    code(interaction, client, fetched, "interaction");
  },
  execute: async (message, client, input1, args, typo) => {
    const amount = input1;
    code(message, client, Number(amount), "message");
  },
};
