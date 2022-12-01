const { EmbedBuilder } = require("discord.js");
const { stop_emoji, error_emoji } = require("../../../emojis");
const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple, off] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc', '#2F3136']

this.stop_music_embed = (user) => new EmbedBuilder()
    .setDescription(`<${stop_emoji}> Playlist cleared by: **${user.username}#${user.discriminator}**. Music is OFF <${error_emoji}>`)
    .setColor(softRed)