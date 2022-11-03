const {EmbedBuilder} = require('discord.js')

this.channel_list_embed= (guild) => {
    const embed = new EmbedBuilder()
    .setTitle(`🔸 ${guild.name} 🔸\n**\`Configs/voice/crud/channels\`** `)
    .setDescription('📌 Select a channel to start the temp channels configuration')
    .setThumbnail(guild.iconURL())

    return embed
}

this.sucess_database_removal = (name,id) => {
    const embed = new EmbedBuilder()
    .setFooter({text:`🔸 Successfully removed from database.\n${name} | id: ${id}`, iconURL:'https://i.pinimg.com/originals/12/9e/ba/129eba52d364e926b24ca4dcc0500a3c.jpg'})
    .setColor('#00FF00')
    return embed
}