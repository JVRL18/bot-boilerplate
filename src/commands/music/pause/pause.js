const { SlashCommandBuilder } = require('discord.js')
const { stop_emoji, play_emoji } = require('../../../emojis')
const { Guild } = require('../../../models/schemas')
const { queue_paused_embed } = require('./_embeds')
const { verify } = require('../../../configs/utils/debug')

const code = async (i) => {
    const { player, client } = require('../../../index')
    const guildData = await Guild.findOne({ id: i.guild.id }) || new Guild({ id: i.guild.id })
    const queue = player.getQueue(i.guild.id)
    
    if (!queue || !queue.playing) return await i.reply({ content: "Doesn't have any music on playlist", ephemeral: true })
    
    if(await verify(i)) return

    if(!i.member.permissions.has('Administrator')){
        if (queue.current.requestedBy.id !== i.user.id) return i.reply({ content: "You can't do that.", ephemeral:true })
    }

    queue.setPaused(!guildData.isPaused)
    guildData.isPaused = !guildData.isPaused
    await guildData.save()

    const data = { embeds: [queue_paused_embed(`${guildData.isPaused ? `<${stop_emoji}>` : `<${play_emoji}>` } Music is \`${guildData.isPaused ? 'paused' : 'unpaused'}\` by: ${i.user.username}#${i.user.discriminator}`)] }

    const { musicChannel, paused } = guildData
    if (guildData.paused === null) {
        i.reply({ content: "Request recived", ephemeral: true })
        let msg = await i.channel.send(data).catch(err => { })

        guildData.paused = msg.id
        await guildData.save()
    } else {
        i.reply({ content: "Request recived", ephemeral: true })
        await client.channels.resolve(musicChannel).messages.delete(paused).catch(err => {
            console.log(err);
        })
        let msg = await i.channel.send(data).catch(err => { })

        guildData.paused = msg.id
        await guildData.save()
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the current queue'),
    run: async (interaction, client, typo) => {

        code(interaction)
    },
    execute: async (message, client, input1, typo) => {

        code(message)
    }
}