const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle } = require('discord.js')
const { play_emoji } = require('../../../emojis')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle

this.query_select_buttons = (items, disable = false) => {
    let row = new ActionRowBuilder()

    for(const key of items){
        row.addComponents(
            new ButtonBuilder()
            .setCustomId(`id_${key.index}`)
            .setLabel(` ${key.index + 1 } `)
            .setEmoji(play_emoji)
            .setStyle(Secondary)
            .setDisabled(disable)
        )
    }
    return row
}