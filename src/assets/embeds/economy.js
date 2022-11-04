const { EmbedBuilder } = require("discord.js")

this.success_give_transaction = (sender, reciver, amount) => {
    const senderNewBal = sender.bal
    const senderName = sender.username
    const reciverNewBal = reciver.bal
    const reciverName = reciver.username
    const coinName = `coinName`
    const transactionId = 0
    const embed = new EmbedBuilder()
        .setColor("00FF00")
        .setDescription(`🔎 Transaction id:#${transactionId}\n💰 \`${senderName}\` Gave: \`💸 +${amount}${coinName}\` To: \`${reciverName} ✅\``)

    return embed
}

this.sucess_withdraw_transaction = (amount)=> {
    const transactionId = 0

    const embed = new EmbedBuilder()
    .setColor("00FF00")
    .setDescription(`🔎 Transaction id:#{${transactionId}}\n🔺 Value: \`${amount}💸\``)

    return embed
}
this.balanceEmbed = (user, userData) => {
    const balance = new EmbedBuilder()
        .setTitle(`${user.username}'s balance`)
        .setDescription('Note: requested user wallet.')
        .setColor('#FFFFFF')
        .addFields({
            name: '🔸 Wallet',
            value: `**\`💲 ${userData.wallet} \`**`,
            inline: true
        })
        .addFields({
            name: '🔸 Bank',
            value: `**\`💲 ${userData.bank} \`**`,
            inline: true
        })

    return balance
}