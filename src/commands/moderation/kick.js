const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ComponentType,
} = require("discord.js");
const { kick, kicked } = require("../../assets/embeds/moderation");
const { confirm } = require("../../assets/buttons/confirm");
const { noPerm } = require("../../assets/embeds/global");

const code = async (member, reason, i) => {
  if (!i.member.permissions.has(PermissionFlagsBits.KickMembers))
    return await i.reply({ embeds: [noPerm()] });

  let user = member.user;

  await i.reply({
    embeds: [kick(user, reason)],
    components: [confirm()],
  });

  const collector = i.channel.createMessageComponentCollector({
    ComponentType: ComponentType.Button,
    max: 1,
  });
  collector.on("collect", async (k) => {
    if (i.member.id !== k.user.id)
      return k.reply({ contet: "It itsn't your button." });
    if (k.customId === "yep") {
      k.update({
        embeds: [kicked(user, reason)],
        components: [],
      });
      member.kick(reason);
    }
  });
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
  run: async (interaction, client, typo) => {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") ?? "Not specified.";

    code(user, reason, interaction);
  },
  execute: async (message, client, input1, args, typo) => {
    if (!args[0]) return message.reply({ content: "You must provide a user." });

    let membro =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!membro)
      return message.reply({ content: "You must provide a valid user." });

    const reason =
      args[1] === undefined ? "Not specified" : args.slice(1).join(" ");
    code(membro, reason, message);
  },
};
