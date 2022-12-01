const { success_save_embed, error_save_embed } = require("./_embeds")
const { success_emoji, error_emoji, white_arrow_emoji } = require('../../../emojis')
const [e1, e2, e3] = [`<${error_emoji}>`, `<${success_emoji}>`, `<${white_arrow_emoji}>`]

module.exports = {
    execute: async (i, client) => {
        const { player } = require("../../../index")
        const { User } = require("../../../models/schemas")
        const userData = await User.findOne({ id: i.user.id })
        const queue = player.getQueue(i.guildId)
        
        if (!queue || !queue.playing) return await i.reply({ embeds:[error_save_embed(`${e1} Can't do that when music is not playing. ${e1}`)], ephemeral: true })
        
        let found = false
        
        const { title, url, author, duration } = queue.current
        
        userData.favorites.filter(e => {if(e.url === url) found = true})

        if(found) return i.reply({ embeds: [error_save_embed(`${e1} Song already saved in favorites. ${e1}`)], ephemeral:true })

        userData.favorites.push({
            url: url,
            title: title,
            author: author,
            duration: duration,
            track: queue.current
        })

        await userData.save()

        let text = `${e2} Song saved sucessfully to favorites playlist. ${e2}\n${e3} \`${client.prefix}favorites\` or use \`/favorites\` to add your favorites to queue.`
        return i.reply({ embeds: [success_save_embed(text)], ephemeral:true })

    }
}