const client = require('../index.js')
const { Guild } = require('../models/schemas')

client.on('interactionCreate', async interaction => {

    const guildData = await Guild.findOne({ id: interaction.guild.id })
    if (guildData === null) return
    
    if (guildData?.ticketChannel?.id === interaction.channel.id) {
      require('../commands_fixed/ticket').new_ticket(interaction, client)
    }

    if (interaction.customId === 'ticket_delete' && guildData.openTickets.indexOf(interaction.channel.id) !== -1) {
      require('../commands_fixed/ticket').delete_ticket(interaction, client)
    }

    return
  })