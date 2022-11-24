const { SlashCommandBuilder } = require("discord.js");
const { stop } = require("../../assets/embeds/music");

const code = async (i, client) => {
    const queue = client.player.getQueue(i.guildId)

    if(!queue || !queue.playing) return await i.reply({ content: "Doesn't have any music on playlist" })

    queue.destroy()
    const embed = await stop()
    await i.reply({ embeds: [embed] })
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