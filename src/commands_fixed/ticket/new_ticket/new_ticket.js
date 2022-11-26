const { delete_button } = require('./_buttons')
const { ticket_popup_embed } = require('./_embeds')
const { Guild, User } = require('../../../models/schemas')

module.exports = {
    execute: async (interaction, client) => {
        if (!interaction.isButton()) return
        const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })
        const userData = await User.findOne({ id: interaction.user.id }) || new User({ id: interaction.user.id })
        if (userData.ticketOpen) return message.reply({ content: "You already do have a ticket open", ephemeral: true })

        const newChannel = await interaction.guild.channels.create({
            name: interaction.user.id + String(userData.tickets),
            type: 0,
            parent: guildData.channels?.tickets?.id,
            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
                },
                {
                    id: interaction.user.id,
                    allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
                },
                {
                    id: client.user.id,
                    allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
                }
            ]
        })

        userData.tickets += 1
        userData.ticketOpen = true

        await guildData.updateOne({
            "$set": {
                [`openTicketSource.${newChannel.id}`]: interaction.user.id
            }
        })

        guildData.openTickets.push(newChannel.id)
        await guildData.save()
        await userData.save()
        interaction.reply({
            content: `Ticket aberto [clique aqui](https://discord.com/channels/${interaction.guild.id}/${newChannel.id})`,
            ephemeral: true
        })
        //Embed de introdução do ticket
        newChannel.send({ embeds: [ticket_popup_embed(interaction.guild, undefined, newChannel.name)], components: [delete_button()] })

    }
}