const { EmbedBuilder } = require("discord.js");
const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const ms = require('pretty-ms')
this.single_music_play_embed = song => {

    return new EmbedBuilder()
        .setDescription(`Added song to queue:\n[${song.title}](${song.url}) **BY: ${song.author}** **\`[${song.duration}]\`**`)
        .setThumbnail(song.thumbnail)
        .setColor("#C261FE")
}

this.mult_music_play_embed = (playlist, tracks) => {
    let duration = 0
    for(const key of tracks){
        duration+= key.durationMS
    }

    const embed = new EmbedBuilder()
        .setDescription(`Added playlist to queue:\n[${playlist.title}](${playlist.url}) \`[${ms(duration)}]\` - \`${tracks.length}\` tracks found`)
        .setThumbnail(playlist.thumbnail.url)
        .setColor("#C261FE")

    return embed;
}
