const { EmbedBuilder } = require("discord.js");
const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']

this.single_music_play_embed = song => {

    return new EmbedBuilder()
        .setDescription(`Added song to queue:\n[${song.title}](${song.url})`)
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration: ${song.duration}` })
        .setColor("#C261FE")
        
}

this.mult_music_play_embed = (playlist, tracks) => {

    const embed = new EmbedBuilder()
        .setDescription(`Added playlist to queue:\n[${playlist.title}](${playlist.url})`)
        .setThumbnail(playlist.thumbnail.url)
        .setFooter({ text: `Duration: idk yet ${tracks.length} tracks` })
        .setColor("#C261FE")

    return embed;
}
