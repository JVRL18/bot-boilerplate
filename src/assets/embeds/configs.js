const { EmbedBuilder } = require('discord.js')
const { Guild } = require('../../models/schemas')

const types = {
    0: '⏳ Temp voice channel'
}
this.guildOverView = async (guild, user) => {
    let serverData = await Guild.findOne({ id: guild.id, owner: guild.ownerId }) || new Guild({ id: guild.id, owner: guild.ownerId })
    const channels = serverData.channels
    const embed = new EmbedBuilder()
        .setTitle(`🔸 ${guild.name} 🔸\n**\`Configs\`** `)
        .setThumbnail(guild.iconURL())
        .setDescription('General server configs')

    if (Object.keys(channels).length === 0) {
        embed.addFields({
            name: 'Channels',
            value: 'This guild has no channel with configs',
            inline: true
        })
    } else {
        for (key of Object.keys(channels)) {
            if(key === 'tickets'){
                embed.addFields({
                    name: `Tickets Channel`,
                    value: `Category: \`**${channels[`${key}`].name}**\``,
                    inline: true
                })
            }else{
                const child = channels[`${key}`].configs
                embed.addFields({
                    name: `${channels[`${key}`].name}`,
                    value: `${types[channels[`${key}`].type]}\n💬 Temp name: \`${child.name}\`\n📞 Max users: \`${child.userLimit}\``,
                    inline: true
                })
            }
        }
    }

    return embed
}

this.voice_config_page = (guild) => {
    const embed = new EmbedBuilder()
        .setTitle(`🔸 ${guild.name} 🔸\n**\`Configs/voice\`** `)
        .setDescription('Select one of existing types of voice configurations')
        .setThumbnail(guild.iconURL())

    return embed
}

this.text_config_page = (guild) => {
    const embed = new EmbedBuilder()
        .setTitle(`🔸 ${guild.name} 🔸\n**\`Configs/text\`** `)
        .setDescription('Select one of existing types of text configurations')
        .setThumbnail(guild.iconURL())

    return embed
}

this.add_remove_edit_page = (guild) => {
    const embed = new EmbedBuilder()
        .setTitle(`🔸 ${guild.name} 🔸\n **\`Configs/voice/crud\`** `)
        .setDescription('Menus for server configuration, here you can create new configs, delete or update existent configs.')
        .setThumbnail(guild.iconURL())

    return embed
}
