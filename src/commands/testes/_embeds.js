const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')
const { success_emoji } = require('../../emojis')
const x = `<${success_emoji}>`

this.emoji_preview_embed = e =>  new EmbedBuilder()
        .setDescription(`${x} >> Button preview id: \` ${e} \` << ${x}`)
        .setColor(off)

