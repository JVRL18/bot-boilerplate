const { SlashCommandBuilder } = require("discord.js");
const { queue_embed = queue } = require('../../assets/embeds/music')

const code = async (i, client, args) => {
    const queue = client.player.getQueue(i.guildId)

    if(!queue || !queue.playing) return await i.reply({ content: "Doesn't have any music on playlist" })
    if(!isNaN(args)) args = 1

    const totalPages = Math.ceil(queue.tracks.length / 10) || 1
    const page = (args || 1) - 1

    if(page > totalPages) return await i.reply({ content: `Invalid number of pages. Actually have ${totalPages} page(s)` })

    const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
        return `**${page * 10 + i + 1}.** \`${song.title}\` (${song.duration})`
    }).join("\n")

    const currentSong = queue.current;

    let embed = await queue_embed(currentSong, queueString, page, totalPages);
    await i.reply({ 
        embeds: [embed]
    })
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('See the musics on queue.')
    .addNumberOption(opt => 
        opt.setName('page')
        .setDescription('Select the page')
    ),
    run: (interaction, client, typo) => {
        code(interaction, client, interaction.options.getString('page'));
      },
    execute: (message, client, input1,inputs, typo) => {
        code(message, client, input1);
    },
}