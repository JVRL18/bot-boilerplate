const { Guild, Channel } = require('../../models/schemas')
const Guilds = Guild
const { channel_list_menu } = require('../../assets/menus/vc_crud_menus')
const { channel_list_embed, sucess_database_removal } = require('../../assets/embeds/vc_crud')
const { vc_crud_fields } = require('../../assets/modals/vc_crud_options')

const fetch = async (guildId, client) => {
    await client.guilds.fetch(guildId)
}

module.exports = {
    create: {
        async execute(Guild, client, where, interaction) {
            const filter = i => i.user.id === '429771320964939787' || i.user.id === Guild.owner
            await fetch(where.guild.id, client)
            const guild = where.guild
            const regulars = []
            await where.guild.channels.cache.map(c => { c.type === 2 ? regulars.push(c) : '' })

            let msg = await interaction.update({
                components: [channel_list_menu(regulars.map(e => {
                    const section = { label: e.name, description: '--', emoji: '🔧', value: e.id }
                    return section
                }))],
                content: 'as',
                embeds: [channel_list_embed(guild)]
            })

            let channelId
            const collector = msg.createMessageComponentCollector({ time: 60000, filter })
            collector.on('collect', async i => {
                channelId = i.values[0]
                regulars.map(c => { if (c.id === channelId) channel = c })

                await i.showModal(vc_crud_fields())
                const filter = (interaction) => interaction.customId === 'modal';
                i.awaitModalSubmit({ filter, time: 60000 })
                    .then(async data => {

                        let childName
                        let userLimit
                        let channel = client.channels.cache.get(channelId)
                        const infos = data.fields.fields.map(e => {
                            return {
                                type: e.customId,
                                value: e.value
                            }
                        })
                        infos.map(e => {
                            if (e.type === 'childName') childName = e.value
                            if (e.type === 'userLimit') userLimit = Number(e.value)
                        })
                        const config = new Channel(channel, childName, userLimit, 0, channel.name, 2).build()
                        const guildData = await Guilds.findOne({ id: data.guild.id, owner: data.guild.ownerId }) || new Guilds({ id: data.guild.id, owner: data.guild.ownerId })
                        await guildData.updateOne(
                            {
                                "$set": {
                                    [`channels.${channelId}`]: config[channelId]
                                }
                            })
                        data.reply(`Registrado **\`${childName}\`**, max: **\`${userLimit}\``)
                    })
                    .catch(console.error);
            })
        }
    },
    update: {
        async execute(Guild, client, where) {

        }
    },
    delete: {
        async execute(Guild, client, where, interaction) {
            let serverData = await Guilds.findOne({ id: where.guild.id, owner: where.guild.ownerId }) || new Guilds({ id: where.guild.id, owner: where.guild.ownerId })
            const filter = i => i.user.id === Guild.owner || i.user.id === "429771320964939787"
            await fetch(where.guild.id, client)
            const guild = where.guild
            const regulars = []
            await where.guild.channels.cache.map(c => { c.type === 2 ? regulars.push(c) : '' })
            const channels = serverData.channels

            const chInfo = []
            for (key in channels) {
                chInfo.push({
                    label: channels[key].name, description: '--', emoji: '✔', value: channels[key].id
                })
            }
            let msg = await interaction.update({
                components: [channel_list_menu(chInfo)],
                embeds: [channel_list_embed(guild)]
            })

            const collector = msg.createMessageComponentCollector({ time: 60000, filter })
            collector.on('collect', async i => {
                let channelId = i.values[0]
                const guildData = await Guilds.findOne({ id: where.guild.id, owner: where.guild.ownerId }) || new Guilds({ id: where.guild.id, owner: where.guild.ownerId })
                await guildData.updateOne(
                    {
                        "$unset": {
                            [`channels.${channelId}`]: 1
                        }
                    })
                await i.update({embeds:[sucess_database_removal(channels[i.values[0]].name, channels[i.values[0]].id)], components:[]})
            })
        }
    }
}