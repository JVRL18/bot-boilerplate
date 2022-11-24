const { SlashCommandBuilder } = require("discord.js");

const code = async (i, client) => {
    const queue = client.player.getQueue(i.guildId)

    if(!queue || !queue.playing) return await i.reply({ content: "Doesn't have any music on playlist" })

    queue.shuffle()
    const embed = await stop()
    await i.reply({ content: "Playlist shuffled!" })
}

module.exports = {
    data: new SlashCommandBuilder().setName("shuffle").setDescription("Shuffle the playlist"),
    run: (interaction, client) => {
        code(interaction, client);
    },
    execute: (message, client) => {
        code(message, client);
    },
}