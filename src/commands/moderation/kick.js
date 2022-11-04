const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { kick } = require("../../assets/embeds/moderation");
const { confirm } = require("../../assets/components/confirm");

const code = async (user, reason, i) => {
  
  await i.reply({ embeds:[kick(user, reason)], components:[confirm()] });

};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick an user")
    .addUserOption((opt) =>
      opt
        .setName("user")
        .setDescription("Choose the user to kick")
        .setRequired(true)
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
  execute: async (message, client, input1, inputs, typo) => {
    if(!inputs[0]) return message.reply({ content: "You must provide a user." })

    const kicked = inputs[0].slice(2, inputs[0].length - 1)
    const user = await client.users.cache.get(kicked)
    console.log(user)
    if(user === undefined) return message.reply({ content: "You must provide a valid user."})
    
    const reason = inputs[1] === undefined ? 'Not specified' : inputs[1]
    code(user, reason, message);
  },
};
 