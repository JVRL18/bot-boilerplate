const { SlashCommandBuilder } = require('discord.js')
const { User } = require('../models/schemas')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Get bot latency"),
    run: async (interaction, client, typo) => {
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id || new User({ id: user.id }) })

        return interaction.reply(`Pong latency is ${interaction.client.ws.ping}ms`)
    },
    execute: async (message, client, input1, typo) => {
        const user = message.author
        const userData = await User.findOne({ id: user.id || new User({ id: user.id }) })

        message.reply(`Pong latency is ${message.client.ws.ping}ms`)
    }
}