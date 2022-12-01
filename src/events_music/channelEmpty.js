const { Guild } = require("../models/schemas")
const { end_queue_embed } = require('./_embeds.js')
const { player } = require('../index.js')

player.on("channelEmpty", async (queue, track) => {
    const { client } = require('../index.js')

    const guildData = await Guild.findOne({ id: queue.guild.id })
    if (guildData === null) return

    const { musicChannel, paused } = guildData

    const channel = await client.channels.cache.get(musicChannel)

    await client.channels.resolve(musicChannel).messages.delete(paused).catch(err => { })

    guildData.voiceChannel = null
    guildData.musicChannel = null
    guildData.tempMessage = null
    guildData.isPlaying = false
    guildData.isPaused = false
    guildData.paused = null

    await guildData.save()
    
    await channel.send({ embeds:[end_queue_embed(`👋 I was left alone, hope you enjoyed. type: \`${client.prefix}play\` or \`/play\` to listen to more songs`)] })
})
