const { delete_button } = require('../assets/buttons/ticket')
const { ticket_popup_embed } = require('../assets/embeds/ticket')
const { Guild, User } = require('../models/schemas')
const Guilds = Guild

module.exports = {
    new_ticket: async (interaction, client) => {
        if (!interaction.isButton()) return
        const guildData = await Guilds.findOne({ id: interaction.guild.id }) || new Guilds({ id: interaction.guild.id })
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

    },
    delete_ticket: async (interaction, client) => {
        const guildData = await Guilds.findOne({ id: interaction.guild.id })
        const userData = await User.findOne({ id: guildData.openTicketSource[interaction.channel.id] }) || new User({ id: guildData.openTicketSource[interaction.channel.id] })

        await userData.updateOne({
            "$set": {
                ["ticketOpen"]: false
            }
        })

        await guildData.updateOne({
            "$unset": {
                [`openTicketSource.${interaction.channel.id}`]: 1
            }
        })

        const tickets = guildData.openTickets
        guildData.openTickets.splice(tickets.indexOf(interaction.channel.id), 1)
        await guildData.save()

        await interaction.channel.delete()
    }
}