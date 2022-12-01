const { SlashCommandBuilder } = require("discord.js");
const { Guild } = require("../../../models/schemas");
const { stop_music_embed } = require('./_embeds')
const { verify } = require('../../../configs/utils/debug')

const code = async (i, client) => {
    const { player } = require("../../../index")
    const queue = player.getQueue(i.guildId)
   
    const guildData = await Guild.findOne({ id:i.guild.id }) || new Guild({ id: i.guild.id})
  
    if(!queue || !queue.playing) return await i.reply({ content: "Doesn't have any music on playlist", ephemeral:true })
    
    if(await verify(i)) return

    if(!i.member.permissions.has('Administrator')){
        if (queue.current.requestedBy.id !== i.user.id) return i.reply({ content: "You can't do that.", ephemeral:true })
    }

    const { musicChannel, paused } = guildData

    await client.channels.resolve(musicChannel).messages.delete(paused).catch(err => { })
    guildData.paused = null
    guildData.tempMessage = null
    guildData.musicChannel = null
    guildData.isPaused = false
    guildData.isPlaying = false
    guildData.voiceChannel = null
    await guildData.save()


    queue.destroy()

    await i.reply({ embeds: [stop_music_embed(i?.user || i?.author)] })
}

module.exports = {
    data: new SlashCommandBuilder().setName("stop").setDescription("skip a music on playlist"),
    run: (interaction, client) => {
        code(interaction, client);
    },
    execute: (message, client) => {
        code(message, client);
    },
}