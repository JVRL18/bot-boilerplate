const { success_removal_embed, error_removal_embed } = require("./_embeds")
const { success_emoji, error_emoji } = require('../../../emojis')
const { User } = require("../../../models/schemas")
const [e1, e2] = [`<${error_emoji}>`, `<${success_emoji}>`]
const { check } = require('../../../configs/utils/debug')

module.exports = {
    execute: async (i, client) => {
        const { player } = require("../../../index")
        const userData = await User.findOne({ id: i.user.id })
        const queue = player.getQueue(i.guildId)
        
        if (!queue || !queue.playing) return await i.reply({ embeds:[error_removal_embed(`${e1} Can't do that when music is not playing. ${e1}`)], ephemeral: true })
        
        let found = false
        let index = 0
        let findex
        const { title, url, author, duration } = queue.current
        
        userData.favorites.filter(e => {
            if(e.url === url){
                found = true
                findex = index
                return
            }
            index++
        })

        if(!found) return i.reply({ embeds: [error_removal_embed(`${e1} Song is not saved in favorites. ${e1}`)], ephemeral:true })

        const removed = userData.favorites.splice(findex, 1)
        check(`${removed}`)
        await userData.save()

        let text = `${e2} Song sucessfully removed from favorites playlist. ${e2}`
        return i.reply({ embeds: [success_removal_embed(text)], ephemeral:true })

    }
}