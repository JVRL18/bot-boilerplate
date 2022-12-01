const { query_select_buttons } = require('./_buttons')
const { query_select_embed, actual_song_change } = require('./_embeds')

module.exports = {
    execute: async (i, bad) => {
        const msg = i
        const { client } = require('../../../index')
        const pagination = 5
        let query = client.userTemp.get(i.user.id)
        if (!query) return
        let display = []
        let index = 0
        let ind = 0
        for (const key of query) {
            ind++
            display.push({ title: key.title, url: key.url, author: key.author, index: index })
            if(ind === pagination){
                break
            }
            index++
        }

        const selected = display
        await i.reply({ embeds: [query_select_embed(selected)], components: [query_select_buttons(selected)], ephemeral:true })

        const filter = x => x.user.id === i.user.id 
        const collector = i.channel.createMessageComponentCollector({ filter, max: 1, time: 30000 })
        collector.on('collect', async i => {
            await msg.message.delete().catch(err => {})

            const { player } = require('../../../index')
            const queue = player.getQueue(i.guildId)
            const current = player.getQueue(i.guildId).current
            const { url, requestedBy, author, title, thumbnail } = current

            const index = Number(i.customId.slice(3))
            const pref = selected[index]
            if(query[0]?.url === pref?.url) return i.channel.send({ content:"You just selected the same song, lol, are you okay?" })
            
            if(url === query[0].url && requestedBy.id === i.user.id){

                queue.addTrack(query[index])
                queue.skip()
                let text = `❗ Selected music changed, adding and skipping. New song: [${query[index].title}](${query[index].url}), **BY: ${query[index].author}**) \`[${query[index].duration}]\``
                return i.channel.send({ embeds:[actual_song_change(text,query[index].thumbnail)] })
            
            }
            if(url !== query[0].url){
                const position = queue.getTrackPosition(query[0])

                queue.tracks.splice(position, 1, query[index])

                let text = `❗ Selected music changed, New song: [${query[index].title}](${query[index].url}), **BY: ${query[index].author}**) \`[${query[index].duration}]\``
                return i.channel.send({ embeds:[actual_song_change(text,query[index].thumbnail)] })
            }

        })
    }
}