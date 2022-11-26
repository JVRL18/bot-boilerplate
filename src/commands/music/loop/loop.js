const { SlashCommandBuilder } = require('discord.js')
const { queue_loop_embed } = require('./_embeds')

const code = async (interaction) => {
    const { player } = require('../../../index')
    const user = interaction?.user || interaction?.author
    const queue = player.getQueue(interaction.guild.id)

    if (!queue.playing) return await interaction.reply({ content: "Doesn't have any music on playlist", ephemeral: true })
    
    queue.repeatMode === 0 ? queue.setRepeatMode(2) :  queue.setRepeatMode(0)

    await interaction.reply({ embeds: [queue_loop_embed(`⏸ Queue is ${queue.repeatMode === 0 ? 'not looping anymore' : 'looping now!'} by: ${user.username}#${user.discriminator}`)] })
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