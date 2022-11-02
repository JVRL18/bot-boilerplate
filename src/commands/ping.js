const {SlashCommandBuilder} = require('discord.js')

const code = (where, client) => {
    return where.reply(`Pong latency is ${where.client.ws.ping}ms`)
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Get bot latency"),
    run: (interaction,client,typo) => {
        
        code(interaction, client)
    },
    execute:(message, client, input1, typo) => {

        code(message, client)
    }
}