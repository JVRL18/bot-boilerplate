const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require("discord.js")

this.new_track_embed = data => {
    return new EmbedBuilder()
    .setDescription(data.text)
    .setImage(data.thumb)
    .setColor(off)
    .setFooter({text:data.fText, iconURL: data.icon})
}