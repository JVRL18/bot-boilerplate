const { queue_tracks_embed } = require("./_embeds");

module.exports = {
    execute: async (i, client, args = 1) => {
        const { player } = require("../../../index")
        const queue = player.getQueue(i.guildId)

        if (!queue || !queue.playing || queue.tracks.length < 2) return await i.reply({ content: "Doesn't have any music on playlist", ephemeral:true })
        
        if (args != Number(args)) args = 1

        const { tracks, current } = queue
        let pages = args > Math.round((tracks.length / 5) + 0.5) ? Math.round((tracks.length / 5) + 0.5) : args
        pages = pages < 1 ? 1 : pages
        let max = pages === 1 ? 5 : (pages * 5)
        let min = pages === 1 ? 0 : (pages - 1) * 5

        var infos = ''
        for (let i = min; i <= max; i++) {
            key = tracks[i]
            if (tracks[i] === undefined) break
            infos += `**\`${i + 1}\` - **[${key.title}](${key.url}) ** **BY: ${key.author}**\n\n`
        }

        await i.reply({ embeds: [queue_tracks_embed(infos, `${pages}/${Math.round((tracks.length / 5) + 0.5)}`)], ephemeral: true })
    }
}