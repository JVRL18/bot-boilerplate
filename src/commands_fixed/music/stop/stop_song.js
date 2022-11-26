const { stop_music_embed } = require('./_embeds')

module.exports = {
    execute: async (i, client) => {
        const { player } = require("../../../index")
        const queue = player.getQueue(i.guildId)
    
        if(!queue || !queue.playing) return await i.reply({ content: "Doesn't have any music on playlist", ephemeral:true })
    
        queue.destroy()
    
        await i.reply({ embeds: [stop_music_embed(i?.user || i?.author)] })      
    }
}