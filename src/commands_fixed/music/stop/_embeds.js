const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']
const { EmbedBuilder } = require('discord.js')
const { error_emoji, loop_emoji, play_emoji, shuffle_emoji, skip_emoji, stop_emoji, success_emoji, trash_emoji } = require("../../../emojis")
this.stop_music_embed = (user) => new EmbedBuilder()
    .setDescription(`<${stop_emoji}> Playlist cleared by: **${user.username}#${user.discriminator}**. Music is OFF <${error_emoji}>`)
    .setColor(softRed)