const { Guild, Channel } = require('../../models/schemas')
const { channel_list_menu } = require('../../assets/menus/vc_crud_menus')
const { channel_list_embed } = require('../../assets/embeds/vc_crud')
const { vc_crud_fields } = require('../../assets/modals/vc_crud_options')
const fetch = async (guildId, client) => {
    await client.guilds.fetch(guildId)
}
const main_collector = async (msg,element = {}) => {
    const filter = element.filter
    const collector = msg.createMessageComponentCollector({ time:60000, filter})
    collector.on('collect', async i => {
        element.function(i)
    })

}
module.exports = {
    create: {
        async execute(Guild, client, where, interaction) {
            const filter = i => i.user.id === Guild.owner
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

            main_collector(msg, {
                filter:filter,
                function: async (i) => {
                    const channelId = i.values[0]
                    let channel
                    regulars.map(c => {if(c.id === channelId) channel = c})
                    await i.showModal(vc_crud_fields())
                    let msg = await i.update({components:[vc_crud_fields()], embeds:[]})
                    main_collector(msg, {
                        filter:filter,
                        function: async i => {
                            const config = new Channel (channel, modalName, userLimit, 0, name).build()
                            console.log(config)
                        }
                    })
                }
            })

        
        }   
    },
    update: {
        async execute(Guild, client, where) {

        }
    },
    delete: {
        async execute(Guild, client, where) {

        }
    }
}