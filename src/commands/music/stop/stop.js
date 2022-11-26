const { SlashCommandBuilder } = require("discord.js");
const { stop_music_embed } = require('./_embeds')

const code = async (i, client) => {
    const { player } = require("../../../index")
    const queue = player.getQueue(i.guildId)

    if(!queue || !queue.playing) return await i.reply({ content: "Doesn't have any music on playlist", ephemeral:true })

    queue.destroy()

    await i.reply({ embeds: [stop_music_embed(i?.user || i?.author)] })
}

module.exports = {
    data: new SlashCommandBuilder().setName("stop").setDescription("skip a music on playlist"),
    run: (interaction, client) => {
        code(interaction, client);
    },
    execute: (message, client) => {
        code(message, client);
    },
}