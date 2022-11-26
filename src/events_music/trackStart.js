const { player, client } = require('../index.js')
const { Guild } = require("../models/schemas")
const { song_options_buttons, features_options_buttons } = require('./_buttons.js')
const { new_track_embed } = require('./_embeds')

player.on("trackStart", async (queue,track) => {

    const guildData = await Guild.findOne({ id:queue.guild.id })
    if(guildData === null) return
    
    const { title, url, duration, author,requestedBy, thumbnail} = track
    const { username, discriminator, id } = requestedBy
    const { musicChannel, tempMessage } = guildData

    const channel = await client.channels.cache.get(musicChannel)

    data = {
        text:`🎶 | Playing: [**${title}**](${url})\n🔎 | ** Song by: ${author}** **\`[${duration}]\`**`,
        thumb:thumbnail,
        fText:`Requested by: ${username}#${discriminator}`,
        icon:`${await client.users.cache.get(id).displayAvatarURL()}`
    }

    const msg = await channel.send({embeds:[new_track_embed(data)], components:[song_options_buttons(), features_options_buttons()]})

    if(tempMessage !== null){
        await client.channels.resolve(musicChannel).messages.delete(tempMessage).catch(err => {})
        guildData.tempMessage = msg.id
        await guildData.save()
    }else{
        guildData.tempMessage = msg.id
        await guildData.save()
    }
})
