const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')

this.shuffle_message_embed = data => {
    return new EmbedBuilder()
        .setImage(data.thumb)
        .setDescription(data.text)
        .setColor(spotifyGreen)
        .setFooter({text:data.fText, iconURL: data.icon})
}
