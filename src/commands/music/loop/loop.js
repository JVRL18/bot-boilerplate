const { SlashCommandBuilder } = require('discord.js')
const { play_emoji, loop_emoji } = require('../../../emojis')
const { queue_loop_embed } = require('./_embeds')
const { verify } = require('../../../configs/utils/debug')

const code = async (interaction) => {
    const { player } = require('../../../index')
    const user = interaction?.user || interaction?.author
    const queue = player.getQueue(interaction.guild.id)

    if (!queue || !queue.playing ) return await interaction.reply({ content: "Doesn't have any music on playlist", ephemeral: true })
    
    if(await verify(interaction)) return
    
    queue.repeatMode === 0 ? queue.setRepeatMode(2) :  queue.setRepeatMode(0)

    await interaction.reply({ embeds: [queue_loop_embed(`${queue.repeatMode === 0 ? `<${play_emoji}>` : `<${loop_emoji}>`} Queue is ${queue.repeatMode === 0 ? 'not looping anymore' : 'looping now!'} by: ${user.username}#${user.discriminator}`)] })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('start looping trough the current queue'),
    run: async (interaction, client, typo) => {

        code(interaction)
    },
    execute: async (message, client, input1, typo) => {

        code(message)
    }
}