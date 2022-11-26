const { Guild, Channel } = require('../../models/schemas')
const Guilds = Guild
const { category_list_menu } = require('../../assets/menus/tc_crud_menus')
const { channel_list_menu } = require('../../assets/menus/vc_crud_menus')
const { tc_description_fields } = require('../../assets/modals/tc_crud_options')
const { ticket_embed } = require('../../commands_fixed/ticket/new_ticket/_embeds')
const { new_ticket_button } = require('../../commands_fixed/ticket/new_ticket/_buttons')
const { category_list_embed, channel_list_embed } = require('../../assets/embeds/tc_crud')

const fetch = async (guildId, client) => {
    await client.guilds.fetch(guildId)
}

module.exports = {
    create: {
        async execute(Guild, client, where, interaction) {

            const filter = i => i.user.id === '429771320964939787' || i.user.id === Guild.owner
            await fetch(where.guild.id, client)
            const guild = where.guild
            let regulars = []
            await where.guild.channels.cache.map(c => { c.type === 4 ? regulars.push(c) : '' })

            let msg = await interaction.update({

                components: [category_list_menu(regulars.map(e => {
                    const section = { label: e.name, description: 'category item', emoji: '📌', value: e.id }
                    return section
                }))],
                embeds: [category_list_embed(guild)]
                
            })

            const collector = msg.createMessageComponentCollector({ time: 60000, filter, max:1 })
            collector.on('collect', async i => {
                let channelId = i.values[0]
                let channel
                regulars.map(c => { if (c.id === channelId) channel = c })

                const guildData = await Guilds.findOne({ id: i.guild.id, owner: i.guild.ownerId }) || new Guilds({ id: i.guild.id, owner: i.guild.ownerId })
                await guildData.updateOne(
                    {
                        "$set": {
                            [`channels.tickets`]: { id: channel.id, name: channel.name }
                        }
                    })
                    
                regulars = []
                await where.guild.channels.cache.map(c => { c.type === 0 ? regulars.push(c) : '' })
                const ooop = await i.update({
                    components: [channel_list_menu(regulars.map(e => {
                        const section = { label: e.name, description: 'text channel', emoji: '💬', value: e.id }
                        return section
                    }))],
                    embeds: [channel_list_embed(guild)]

                })

                const collector = ooop.createMessageComponentCollector({ time: 60000, filter, max:1 })
                collector.on('collect', async i => {
                    let channelId = i.values[0]
                    let channel
                    regulars.map(c => { if (c.id === channelId) channel = c })

                    await i.showModal(tc_description_fields())

                    const filter = (interaction) => interaction.customId === 'modal';
                    i.awaitModalSubmit({ filter, time: 60000 })
                        .then(async i => {
                            const text = i.fields.fields.map(e => e.value)

                            const guildData = await Guilds.findOne({ id: i.guild.id }) || new Guilds({ id: i.guild.id })
                            await guildData.updateOne(
                                {
                                    "$set": {
                                        "ticketChannel": { id: channel.id, name: channel.name, type:'ticket', message:`${text[0]}` }
                                    }
                                })


                            const msg = await client.channels.cache.get(channel.id).send({ embeds:[ticket_embed(text[0], i.guild)], components:[new_ticket_button()]})
                            i.reply({content:`Done! ticket channel is full setup and message was sent and registered in our dataBase, [Check message now](https://discord.com/channels/${i.guild.id}/${msg.channel.id})`})
                        })

                })

            })
        }
    }

}