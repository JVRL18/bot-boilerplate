const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { kick } = require("../../assets/embeds/moderation");
const { confirm } = require("../../assets/components/confirm");

const code = async (user, reason, i) => {
  let embed = kick(user, reason);
  let comp = confirm();
  i.reply({ embeds: [embed], components: [comp] });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick an user")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("Choose the user to kick")
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason for kicking")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false),
  run: async (interaction, client) => {
    const user = interaction.options.getUser("user") || interaction.member.user;
    const reason = interaction.options.getString("reason") ?? "Not specified.";

    code(user, reason, interaction);
  },
  execute: async (message, client, input1, input2) => {
    const user =
      input1 === undefined
        ? message.reply({ content: "You must provide a user." })
        : client.users.cache.get(input1.slice(2, input1.length - 1)) ===
          undefined
        ? message.reply({ content: "You must provide a valid user." })
        : client.users.cache.get(input1.slice(2, input1.length - 1));

    const reason = input2;
    if (!reason) input2 == "Not reason provided";
    reason.slice(1).join(" ");

    console.log(reason);
  },
};
