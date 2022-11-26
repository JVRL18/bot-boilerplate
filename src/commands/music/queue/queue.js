const { SlashCommandBuilder } = require("discord.js");
const { queue_tracks_embed } = require("./_embeds");

const code = async (i, client, args) => {
    const { player } = require("../../../index")
    const queue = player.getQueue(i.guildId)

    if (!queue || !queue.playing) return await i.reply({ content: "Doesn't have any music on playlist", ephemeral:true })
    if (args != Number(args)) args = 1

    const { tracks, current } = queue
    let pages = args > Math.round((tracks.length / 5) + 0.5) ? Math.round((tracks.length / 5) + 0.5) : args
    let max = pages === 1 ? 5 : (pages * 5)
    let min = pages === 1 ? 0 : (pages - 1) * 5

    var infos = ''
    for (let i = min; i <= max; i++) {
        key = tracks[i]
        if(tracks[i] === undefined) break
        infos += `**\`${i + 1}\` - **[${key.title}](${key.url}) ** **BY: ${key.author}** \`[${key.duration}]\`**\n\n`
    }

    i.reply({ embeds: [queue_tracks_embed(infos)], ephemeral:true })
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
        code(interaction, client, interaction.options.getNumber('page'));
    },
    execute: (message, client, input1, inputs, typo) => {
        code(message, client, input1);
    },
}