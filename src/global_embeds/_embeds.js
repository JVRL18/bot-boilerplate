const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')
const { error_emoji } = require('../emojis')

this.not_in_voice_embed_error = () => new EmbedBuilder()
        .setDescription(`<${error_emoji}> Can't do that since you're not in the voice channel. <${error_emoji}>`)
        .setColor(softRed)