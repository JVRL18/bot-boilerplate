const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')

this.query_select_embed = (query, pages) => {
    let text = ''

    for (const key of query) {
        text += `\`[${key.index + 1}]\` - [${key.title}](${key.url}) **BY: ${key.author}** ${key.index === 0 ? "** << CHOOSED LAST TIME **" : ''}\n\n`
    }

    return new EmbedBuilder()
        .setDescription(text)
        .setColor(off)
        .setTitle("🔎 Select a new song to replace the wrong one")
}

this.actual_song_change = (text, url) => new EmbedBuilder()
    .setDescription(text)
    .setColor(spotifyGreen)
    .setThumbnail(url)

this.queue_song_change = (text, url) => new EmbedBuilder()
    .setDescription(text)
    .setColor(spotifyGreen)
    .setThumbnail(url)