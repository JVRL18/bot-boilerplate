const { ActionRowBuilder, ButtonBuilder, ActionRow, ButtonStyle } = require('discord.js')
const { Danger, Link, Secondary, Primary, Success } = ButtonStyle

this.test_emoji_button = (e) => {
    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('ida')
            .setEmoji(e)
            .setStyle(Primary),
        new ButtonBuilder()
            .setCustomId('idc')
            .setEmoji(e)
            .setStyle(Secondary),
        new ButtonBuilder()
            .setCustomId('idh')
            .setEmoji(e)
            .setStyle(Success),
        new ButtonBuilder()
            .setCustomId('idg')
            .setEmoji(e)
            .setStyle(Danger),
        new ButtonBuilder()
            .setEmoji(e)
            .setStyle(Link)
            .setURL("https://discord.com/channels/1028568704377700423/1044695484763222066")
    )
    return row
}
