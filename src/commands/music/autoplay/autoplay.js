const { SlashCommandBuilder } = require('discord.js')
const { queue_loop_embed } = require('./_embeds')
const { error_emoji, shuffle_emoji } = require('../../../emojis')
const { verify } = require('../../../configs/utils/debug')

const code = async (interaction) => {
    const { player, client } = require('../../../index')

    const user = interaction?.user || interaction?.author
    const queue = player.getQueue(interaction.guild.id)
    if (!queue || !queue.playing ) return await interaction.reply({ content: "Doesn't have any music on playlist", ephemeral: true })

    if(await verify(interaction)) return

    queue.repeatMode === 0 ? queue.setRepeatMode(3) :  queue.setRepeatMode(0)

    await interaction.reply({ embeds: [queue_loop_embed(`${queue.repeatMode === 0 ? `<${error_emoji}>` : `<${shuffle_emoji}>` } Queue is ${queue.repeatMode === 0 ? 'not Autoplaying anymore' : 'Autoplaying now!'} **by: ${user.username}#${user.discriminator}**`)] })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autoplay')
        .setDescription('start playing random similar songs forever.'),
    run: async (interaction, client, typo) => {

        code(interaction)
    },
    execute: async (message, client, input1, typo) => {

        code(message)
    }
}