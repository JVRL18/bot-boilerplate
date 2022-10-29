const {EmbedBuilder} = require('discord.js')

const pallete = '#7600bc'

this.justAText = (text, color) => {
    const embed = new EmbedBuilder()
    .setColor(color === undefined? pallete: color)
    .setFooter({text:text})
    return embed
}
