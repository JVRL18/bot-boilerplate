const { Guild, User } = require('../../../models/schemas')

module.exports = {
    execute: async (interaction) => {

        const guildData = await Guild.findOne({ id: interaction.guild.id })
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