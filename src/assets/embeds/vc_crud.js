const {EmbedBuilder} = require('discord.js')

this.channel_list_embed= (guild) => {
    const embed = new EmbedBuilder()
    .setTitle(`♦ ${guild.name} **\`Configs/voice/CRUD/channels\`** ♦`)
    .setDescription('📌 Select a channel to start the temp channels configuration')
    .setThumbnail(guild.iconURL())

    return embed
}