const { Guild } = require('../models/schemas')
const fs = require('fs')
module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, client) {
        if (newState?.channel?.id === undefined) return
        let channelId = newState.channel.id
        let serverData = await Guild.findOne({id:newState.guild.id, owner: newState.guild.ownerId}) || new Guild({id:newState.guild.id, owner: newState.guild.ownerId}) 
        if (serverData.channels?.[`${channelId}`]?.type === undefined) return
        const commandfiles = fs.readdirSync('./src/commands_vc').filter(file => file.endsWith('.js'));
        for (const command of commandfiles){
            const event = require(`../commands_vc/${command}`)
            console.log(event.type)
            if(event.type === serverData?.channels?.[`${channelId}`]?.type){
                event.execute(oldState, newState, client)
            }
        }
    }
}