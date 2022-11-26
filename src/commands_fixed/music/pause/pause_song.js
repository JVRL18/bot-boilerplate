const { Guild } = require('../../../models/schemas')
const { queue_paused_embed } = require('./_embeds')

module.exports = {
    execute: async (i, client) => {
        const { player } = require('../../../index')
        const guildData = await Guild.findOne({ id: i.guild.id }) || new Guild({ id: i.guild.id })
        const queue = player.getQueue(i.guild.id)

        if (!queue.playing) return await i.reply({ content: "Doesn't have any music on playlist", ephemeral: true })

        queue.setPaused(!guildData.isPaused)
        guildData.isPaused = !guildData.isPaused
        await guildData.save()

        i.reply({ embeds: [queue_paused_embed(`⏸ Music is \`${guildData.isPaused ? 'paused' : 'unpaused'}\` by: ${i.user.username}#${i.user.discriminator}`)] })
    }
}