const {User, Guild} = require('../models/schemas')

module.exports = {
    type: 0,
    async execute(oldState, newState, client){
        const channelId = newState.channel.id
        if (newState.channel.members.size == 1) {
            let userData
            let users = []
            let channel = newState.channel
            let serverData = await Guild.findOne({id:newState.guild.id, owner: newState.guild.ownerId}) || new Guild({id:newState.guild.id, owner: newState.guild.ownerId}) 

            for (const [, member] of channel.members) {
                userData = await User.findOne({ id: member.id }) || new User({ id: member.id })
                if (userData.cooldowns.channels === 2) return
                userData.cooldowns.channels += 1
                users.push(member.id)
        
                await userData.save()
            }
            const child =  serverData.channels[`${channelId}`].configs
            let rooms = serverData.channels[`${channelId}`].rooms
            let num = 1
            if (rooms.length === 0) rooms.push(num)
            for (key of rooms) {
                num++
                if (rooms.includes(num) === false) {
                    rooms.push(num)
                    break
                }
            }

            const newChannel = await newState.guild.channels.create({
                name: child.name,
                type: child.type,
                position: child.position,
                parent: child.parent,
                userLimit: child.userLimit
            })

            await serverData.save()
        
            let i = 0
            for (const [, member] of channel.members) {
                if (i === 2) break
                await member.voice.setChannel(newChannel);
                i++
            }
        
            const extendOrDelete = (channel) => {
                setTimeout(async () => {
                    if (channel.members.size === 0) {
                        serverData = await Guild.findOne({ id: newState.guild.id }) || new Guild({ id: newState.guild.id })
        
                        let rooms = serverData.channels[`${channelId}`].rooms
                        rooms.splice(rooms[rooms.indexOf(num) - 1], 1)
                        await serverData.save()
        
                        for (key of users) {
                            userData = await User.findOne({ id: key }) || new User({ id: key })
                            userData.cooldowns.channels -= 1
                            await userData.save()
                        }
                        await channel.delete().catch(err => console.log(err))
        
                    } else {
                        extendOrDelete(channel)
                    }
                }, 1000 * 30);
            }
            extendOrDelete(newChannel)
        }
        
    }
}

