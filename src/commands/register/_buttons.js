const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle } = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle

this.button_name = () => {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('start_register')
            .setLabel('Registro')
            .setEmoji(':992213867063164968:')
            .setStyle(Primary)
    )
}