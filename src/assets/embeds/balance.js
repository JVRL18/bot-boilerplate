const { EmbedBuilder } = require("discord.js")

this.balanceEmbed = (user, userData) => {
    const balance = new EmbedBuilder()
    .setTitle(`${user.username}'s balance`)
    .setDescription('Note: requested user wallet.')
    .setColor('#FFFFFF')
    .addFields({
        name:'🔸 Wallet', 
        value:`**\`💲 ${userData.wallet} \`**`, 
        inline:true
    })
    .addFields({
        name:'🔸 Bank', 
        value:`**\`💲 ${userData.bank} \`**`, 
        inline:true
    })

    return balance
}