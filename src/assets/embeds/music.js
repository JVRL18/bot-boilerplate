const { EmbedBuilder } = require("discord.js");

this.play = async (song) => {
    const embed = new EmbedBuilder()
      .setDescription(`Added to queue:\n[${song.title}](${song.url})`)
      .setThumbnail(song.thumbnail)
      .setFooter({ text: `Duration: ${song.duration}`})
      .setColor("#C261FE")
  
    return embed;
}

this.skip = (currentSong) => {
    const embed = new EmbedBuilder()
      .setDescription(`${currentSong.title} has been skipped!`)
      .setThumbnail(currentSong.thumbnail)
      .setColor("#C261FE")
    return embed;
}

this.stop = () => {
    const embed = new EmbedBuilder()
      .setDescription(`Playlist cleared. Music OFF`)
      .setColor("#C261FE")
    return embed;
}

this.queue_embed = async (currentSong, queueString, page, totalPages) => {
    const embed = new EmbedBuilder()
      .setDescription(`**List:**\n\nPlaying now: \n` + (currentSong ? `\`${currentSong.title}\`\n(${currentSong.duration}) | By: <@${currentSong.requestedBy.id}>` : "None") + `\n----------------------------\n ${queueString}`)
      .setFooter({
        text: `Page ${page + 1} of ${totalPages}`
      })
      .setThumbnail(currentSong.thumbnail)
      .setColor("#C261FE")
  
    return embed;
  }

