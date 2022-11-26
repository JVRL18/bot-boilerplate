const { SlashCommandBuilder } = require('discord.js')
const { Guild } = require('../../../models/schemas')
const { queue_paused_embed } = require('./_embeds')

const code = async (i) => {
    const { player } = require('../../../index')
    const guildData = await Guild.findOne({ id:i.guild.id }) || new Guild({ id: i.guild.id})
    const queue = player.getQueue(i.guild.id)

    if(!queue.playing ) return await i.reply({ content: "Doesn't have any music on playlist", ephemeral:true })
    
    queue.setPaused(!guildData.isPaused)
    guildData.isPaused = !guildData.isPaused
    await guildData.save()

    i.reply({ embeds: [queue_paused_embed(`⏸ Music is paused by: ${i.user.username}#${i.user.discriminator}`)] })
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the current queue'),
    run: async (interaction, client, typo) => {

    code(interaction)
    },
    execute: async (message, client, input1, typo) => {

    code(message)
    }
}