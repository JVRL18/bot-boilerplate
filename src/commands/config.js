const { SlashCommandBuilder } = require('discord.js')
const { guildOverView, voice_config_page, add_remove_edit_page, text_config_page } = require('../assets/embeds/configs')
const { config_menu, voice_config_menu, add_remove_edit_menu, text_config_menu } = require('../assets/menus/config_menu')
const { Guild } = require('../models/schemas')

const code = async (user, Guild, client, where) => {
    Guild.save()
    const guild = where.guild
    const filter = i => i.user.id === "429771320964939787"
    //if (user.id !== where.guild.ownerId) return where.reply({ content: 'Cant do that', ephemeral: true })
    let msg
    msg = await where.reply({ components: [config_menu()], embeds: [await guildOverView(guild, user)] })

    const collector = msg.createMessageComponentCollector({ time: 60000, filter })
    collector.on('collect', async i => {

        if (i.values[0] === 'vc') {
            msg = await i.update({ components: [voice_config_menu()], embeds: [voice_config_page(guild)] })

            const collector = msg.createMessageComponentCollector({ time: 60000, filter })
            collector.on('collect', async i => {

                if (i.values[0] === 'temp') {
                    msg = await i.update({ components: [add_remove_edit_menu()], embeds: [add_remove_edit_page(guild)] })
                    const collector = msg.createMessageComponentCollector({ time: 60000, filter })

                    collector.on('collect', async int => {

                        const event = require('../configs/crud/vc_crud')
                        if (int.values[0] === 'create') {
                            event.create.execute(Guild, client, where, int)
                        }
                        if (int.values[0] === 'delete') {
                            event.delete.execute(Guild, client, where, int)
                        }

                    })
                }

            })
        }

        if (i.values[0] === 'tc') {
            msg = await i.update({ components: [text_config_menu()], embeds: [text_config_page(guild)] })

            const collector = msg.createMessageComponentCollector({ filter, time: 6000 })
            collector.on('collect', async i => {

                if (i.values[0] === 'ticket') {
                    msg = await i.update({ components: [add_remove_edit_menu()], embeds: [add_remove_edit_page(guild)] })
                    const collector = msg.createMessageComponentCollector({ time: 60000, filter })

                    collector.on('collect', async int => {
                        console.log(int.values[0])
                        const event = require('../configs/crud/text_crud')

                        if (int.values[0] === 'create') {
                            event.create.execute(Guild, client, where, int)
                        }

                        if (int.values[0] === 'delete') {
                            event.delete.execute(Guild, client, where, int)
                        }

                    })
                }

            })
        }

    })

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("config")
        .setDescription("Configure the server if you have permission"),
    run: async (interaction, client, typo) => {
        const user = interaction.user
        const Server = await Guild.findOne({ id: interaction.guild.id, owner: interaction.guild.ownerId }) || new Guild({ id: interaction.guild.id, owner: interaction.guild.ownerId })

        code(user, Server, client, interaction)
    },
    execute: async (message, client, input1, typo) => {
        const user = message.author
        const Server = await Guild.findOne({ id: message.guild.id, owner: message.guild.ownerId }) || new Guild({ id: message.guild.id, owner: message.guild.ownerId })

        code(user, Server, client, message)
    }
}