const { EmbedBuilder } = require("discord.js")

const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc']

this.daily_sucess_embed = (user, amount) => {
    const embed = new EmbedBuilder()
        .setDescription(`**Welcome back ${user.username}!**, **\`💲 ${amount} \`** was deposited in your bank account.`)
        .setColor(spotifyGreen)
        .setAuthor({name:`${user.username}'s daily payout`,iconURL:`${user.displayAvatarURL()}`})
    return embed
}
this.daily_cooldown_embed = (user, time) => {
    const embed = new EmbedBuilder()
        .setDescription(`😓 Sorry ${user.username}, come back in **\`${time} \`**`)
        .setColor(twitterBlue)
    return embed
}

this.give_confirm_embed = (user, amount) => {
    const embed = new EmbedBuilder()
        .setDescription(`🙅‍♂️~WAIT! \`${user.username}\` should accept the handshake before.\nAmount to claim: **\`💲 ${amount} \`**`)
        .setColor(`${twitterBlue}`)
    return embed
}
this.give_sucess_embed = (user, amount) => {
    const embed = new EmbedBuilder()
        .setDescription(`😎 Nice!, now you have \`💲 ${amount} \` in your wallet`)
        .setColor(`${spotifyGreen}`)
    return embed
}
this.give_fail_embed = (errorType) => {
    const embed = new EmbedBuilder()
        .setDescription(`${errorType === 'user' ? `❌ Operation was cancelled by the user.` : '⏳ Operation timeout **\`60s\`**'}`)
        .setColor(softRed)

    return embed
}

this.sucess_begging = (amount) => {
    const embed = new EmbedBuilder()
        .setDescription(`😁 Lucky you!, begged and earned \`+${amount}💰 \` `)
        .setColor(spotifyGreen)
    return embed
}

this.fail_begging = (time) => {
    const embed = new EmbedBuilder()
        .setDescription(`🥺 You got nothing this time, try again in **\`${time}\`**`)
        .setColor(softRed)
    return embed
}

this.cooldown_timer = (text) => {
    const embed = new EmbedBuilder()
        .setDescription(`⏳ ${text}`)
        .setColor(twitterBlue)

    return embed
}

this.success_give_transaction = (sender, reciver, amount) => {
    const senderNewBal = sender.bal
    const senderName = sender.username
    const reciverNewBal = reciver.bal
    const reciverName = reciver.username
    const coinName = `coinName`
    const transactionId = 0
    const embed = new EmbedBuilder()
        .setColor(spotifyGreen)
        .setDescription(`🔎 Transaction id:#${transactionId}\n💰 \`😁 ${senderName}\` Gave: \`💸${amount} \` To: \`🤑 ${reciverName} \``)

    return embed
}

this.sucess_withdraw_transaction = (amount) => {
    const transactionId = 0

    const embed = new EmbedBuilder()
        .setColor(spotifyGreen)
        .setDescription(`🔎 Transaction id:#${transactionId}\n💰 Value: \`${amount}💸\``)

    return embed
}
this.balanceEmbed = (user, userData) => {
    const balance = new EmbedBuilder()
        .setAuthor({ name: `${user.username}'s balance`, iconURL: `${user.displayAvatarURL()}` })
        .setDescription('Total is just the sum wallet + bank.')
        .setColor(sucessYellow)
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
        .addFields({
            name: '🔸 Total',
            value: `**\`💲 ${userData.bank + userData.wallet} \`**`
        })

    return balance
}