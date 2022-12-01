const { verify } = require('../../../configs/utils/debug')
const { Guild } = require('../../../models/schemas')
const { stop_music_embed } = require('./_embeds')

module.exports = {
    execute: async (i, client) => {
        const { player } = require("../../../index")
        const queue = player.getQueue(i.guildId)
    
        if(!queue || !queue.playing) return await i.reply({ content: "Doesn't have any music on playlist", ephemeral:true })
        
        if (await verify(i)) return

        if(!i.member.permissions.has('Administrator')){
            if (queue.current.requestedBy.id !== i.user.id) return i.reply({ content: "You can't do that.", ephemeral:true })
        }

        const guildData = await Guild.findOne({ id:i.guildId })

        const { musicChannel, paused } = guildData
    
        await client.channels.resolve(musicChannel).messages.delete(paused).catch(err => { })
        guildData.paused = null
        guildData.tempMessage = null
        guildData.musicChannel = null
        guildData.voiceChannel = null
        guildData.isPaused = false
        guildData.isPlaying = false
        await guildData.save()

        queue.destroy()
    
        await i.reply({ embeds: [stop_music_embed(i?.user || i?.author)] })      
    }
}