const { skip_song_embed } = require('./_embeds')

module.exports = {

    execute: async (i, client) => {
        const { player } = require('../../../index')

        const queue = player.getQueue(i.guildId)

        if (!queue) return await i.reply({ content: "Doesn't have any music on playlist", ephemeral:true })

        queue.skip()
        await i.reply({ embeds: [skip_song_embed(queue.current, i.user)] })

    }

}