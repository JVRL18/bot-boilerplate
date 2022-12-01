const { SlashCommandBuilder } = require('discord.js')

const code = (interaction, user, message) => {

    interaction.channel.send({})

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Set a channel for users quickly register to your server.')
        .addStringOption(option =>
            option
                .setName("message")
                .setDescription("The message to be shown at the register embed")
        ),
    run: async (interaction, client, typo) => {

        code(interaction, interaction.user, interaction.option.getString('message'))
    },
    execute: async (message, client, input1, typo) => {
        return
        code(message, interaction.author)
    }
}