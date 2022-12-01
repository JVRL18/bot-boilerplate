const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')
const ms = require('pretty-ms')

this.mult_music_play_embed = tracks => {
    let duration = 0
    for(const key of tracks){
        duration+= key.durationMS
    }

    const embed = new EmbedBuilder()
        .setDescription(`Added favorites playlist to queue: \`[${ms(duration)}]\` - \`${tracks.length}\` tracks found`)
        .setColor(off)

    return embed;
}