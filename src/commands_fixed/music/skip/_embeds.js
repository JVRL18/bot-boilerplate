const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')

this.skip_song_embed = (currentSong, user) => {
  return new EmbedBuilder()
    .setDescription(`${currentSong.title} has been skipped!`)
    .setThumbnail(currentSong.thumbnail)
    .setColor(off)
    .setFooter({text:`${user.username}#${user.discriminator} Skipped it!`, iconURL:user.displayAvatarURL()})
}