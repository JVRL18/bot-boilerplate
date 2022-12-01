const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')

this.queue_tracks_embed = (text, pages) => new EmbedBuilder()
    .setTitle(`📖 Página ${pages}`)
    .setDescription(text)
    .setColor(spotifyGreen)

