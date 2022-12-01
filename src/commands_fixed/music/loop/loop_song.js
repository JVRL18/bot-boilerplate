const { queue_loop_embed } = require('./_embeds')
const { loop_emoji, play_emoji } = require("../../../emojis")
const { verify } = require('../../../configs/utils/debug')
const { not_in_voice_embed_error } = require('../../../global_embeds/_embeds')

module.exports = {
    execute: async (interaction, client) => {

        const { player } = require('../../../index')
        const user = interaction?.user || interaction?.author
        const queue = player.getQueue(interaction.guild.id)
        
        if (!queue || !queue.playing ) return await interaction.reply({ content: "Doesn't have any music on playlist", ephemeral: true })
        
        if (await verify(interaction)) return
        
        queue.repeatMode === 0 ? queue.setRepeatMode(2) : queue.setRepeatMode(0)

        await interaction.reply({ embeds: [queue_loop_embed(`${queue.repeatMode === 0 ? `<${play_emoji}>` : `<${loop_emoji}>`} Queue is ${queue.repeatMode === 0 ? 'not looping anymore' : 'looping now!'} by: ${user.username}#${user.discriminator}`)] })

    }
}