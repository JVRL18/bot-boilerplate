const { SlashCommandBuilder } = require('discord.js')
const { test_emoji_button } = require('./_buttons')
const { emoji_preview_embed } = require('./_embeds')

const code = (interaction, input) => {
    let id = ''
    if (interaction.type === 2) {
        id = interaction?.options.getString('emoji')
    } else {
        id = input
    }

    interaction.reply({ components: [test_emoji_button(id)], embeds: [emoji_preview_embed(id)] })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Replies a button preview')
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('Emoji id')
                .setRequired(true)
        ),
    run: async (interaction, client, typo) => {

        code(interaction)
    },
    execute: async (message, client, input1, args, typo) => {

        code(message, input1, args)
    }
}