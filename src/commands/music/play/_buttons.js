const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle } = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle

module.exports = {
    display_search_query: () => new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('wrong_song')
            .setLabel('wrong?')
            .setStyle(Danger)
    )
}