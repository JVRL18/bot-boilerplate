const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')
const { skip_emoji } = require('../../../emojis')
this.skip_song_embed = (currentSong, user) => {
  return new EmbedBuilder()
    .setDescription(`[${currentSong.title}](${currentSong.url}) has been skipped! <${skip_emoji}><${skip_emoji}><${skip_emoji}>`)
    .setThumbnail(currentSong.thumbnail)
    .setColor(off)
    .setFooter({ text: `${user.username}#${user.discriminator} Skipped it!`, iconURL: user.displayAvatarURL() })
}