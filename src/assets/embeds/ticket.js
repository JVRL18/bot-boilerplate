const { EmbedBuilder } = require('discord.js')

const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc']

this.ticket_embed = (description, guild) => {
    const embed = new EmbedBuilder()
        .setTitle(guild.name + ' [ - Tickets - ] 📩')
        .setDescription(description)
        .setColor(sucessYellow)

    return embed
}

this.ticket_popup_embed = (guild, message, ticketId) => {
    let text = `Welcome to ${guild.name} ticket support, wait just a couple of seconds until one of our staff members come to help you solve your issue\n`
    let footerText = "Tip: while no one appears, detail you problem so the process will be faster, you can also close the ticket if don't needed anymore."
    const embed = new EmbedBuilder()
        .setTitle(guild.name + `\n[ - Ticket:**\`${ticketId}\`** - ] `)
        .setDescription(message === undefined? text : message)
        .setColor(twitterBlue)
        .setFooter({text:footerText})

    return embed
}