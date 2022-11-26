const { SlashCommandBuilder } = require("discord.js");
const { skip_song_embed } = require("./_embeds")
const code = async (i, client) => {
    const { player } = require('../../../index')

    const queue = player.getQueue(i.guildId)

    if (!queue) return await i.reply({ content: "Doesn't have any music on playlist", ephemeral:true })

    queue.skip()
    await i.reply({ embeds: [skip_song_embed(queue.current, i.user)] })
}

module.exports = {
    data: new SlashCommandBuilder().setName("skip").setDescription("skip a music on playlist"),
    run: (interaction, client) => {
        code(interaction, client);
    },
    execute: (message, client) => {
        code(message, client);
    },
}