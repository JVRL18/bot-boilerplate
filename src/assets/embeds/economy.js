const { EmbedBuilder } = require("discord.js")
const { Transactions } = require("../../models/schemas")
const [spotifyGreen, twitterBlue, softRed, sucessYellow, attentionPurple] = ['#1DB954', '#1DA1F2', '#de3f44', 'e6cc00', '#db23bc']

this.daily_sucess_embed = (user, amount) => {
    const embed = new EmbedBuilder()
        .setDescription(`**Welcome back ${user.username}! 👋**\n> **\`💲 ${amount} \`** was placed in your wallet.`)
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

this.success_give_transaction = async (sender, reciver, amount) => {
    const transaction_general = await Transactions.findOne({id:007}) || new Transactions({id:007, total:0}) 
    transaction_general.total++
    transaction_general.save()
    const transactionId = transaction_general.total

    const senderNewBal = sender.bal
    const senderName = sender.username
    const reciverNewBal = reciver.bal
    const reciverName = reciver.username
    const coinName = `coinName`
    const embed = new EmbedBuilder()
        .setColor(spotifyGreen)
        .setDescription(`🔎 Transaction \`id:#${transactionId}\`\n💰 \`😁 ${senderName}\` Gave: \`💸${amount} \` To: \`🤑 ${reciverName} \``)

    return embed
}

this.sucess_withdraw_transaction = async (amount) => {
    const transaction_general = await Transactions.findOne({id:007}) || new Transactions({id:007, total:0}) 
    transaction_general.total++
    transaction_general.save()
    const transactionId = transaction_general.total

    const embed = new EmbedBuilder()
        .setColor(spotifyGreen)
        .setDescription(`🔎 Transaction \`id:#${transactionId}\`\n💰 Value: \`${amount}💸\``)

    return embed
}
this.balanceEmbed = (user, userData) => {
    const balance = new EmbedBuilder()
        .setAuthor({ name: `${user.username}'s balance`, iconURL: `${user.displayAvatarURL()}` })
        .setDescription(`🔸 Wallet: **\`💲 ${userData.wallet} \`**\n🔸 Bank: **\`💲 ${userData.bank} \`**\n🔸 Net: **\`💲 ${userData.bank + userData.wallet} \`**`)
        .setColor(sucessYellow)

    return balance
}