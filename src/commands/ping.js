const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Get bot latency"),
    run: (interaction,client,typo) => {
        return interaction.reply(`Pong latency is ${interaction.client.ws.ping}ms`)
    },
    execute:(message, client, input1, typo) => {
        message.reply(`Pong latency is ${message.client.ws.ping}ms`)
    }
}