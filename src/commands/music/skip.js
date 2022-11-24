const { SlashCommandBuilder } = require("discord.js");
const { skip } = require("../../assets/embeds/music");

const code = async (i, client) => {
    const queue = client.player.getQueue(i.guildId)

    if(!queue) return await i.reply({ content: "Doesn't have any music on playlist" })

    const currentSong = queue.current;

    queue.skip()
    const embed = await skip(currentSong)
    await i.reply({ embeds: [embed] })
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