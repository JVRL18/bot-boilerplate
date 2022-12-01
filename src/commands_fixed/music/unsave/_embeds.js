const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')

this.success_removal_embed = data => new EmbedBuilder()
    .setDescription(data)
    .setColor(spotifyGreen)

this.error_removal_embed = data => new EmbedBuilder()
    .setDescription(data)
    .setColor(softRed)

