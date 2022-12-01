const { verify } = require('../../../configs/utils/debug')
const { not_in_voice_embed_error } = require('../../../global_embeds/_embeds')
const { skip_song_embed } = require('./_embeds')

module.exports = {

    execute: async (i, client) => {
        const { player } = require('../../../index')
        
        const queue = player.getQueue(i.guildId)

        if (!queue) return await i.reply({ content: "Doesn't have any music on playlist", ephemeral:true })
        
        if (await verify(i)) return
        
        if(!i.member.permissions.has('Administrator')){
            if (queue.current.requestedBy.id !== i.user.id) return i.reply({ content: "You can't do that.", ephemeral:true })
        }
        queue.skip()
        await i.reply({ embeds: [skip_song_embed(queue.current, i.user)] })

    }

}