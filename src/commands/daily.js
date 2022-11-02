const { SlashCommandBuilder } = require('discord.js')
const { User } = require('../models/schemas')
const prettyMilliseconds = require('pretty-ms')
const { justAText } = require('../assets/embeds/global')

const code = (user, userData, where) => {
    if (userData.cooldowns.daily > Date.now()) {
        return where.reply({embeds:[justAText(`C.U. bot services`,'00FF00').setDescription(`You can claim again in \`${prettyMilliseconds(userData.cooldowns.daily - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}\``)]})
    }

    const amount = 395
    userData.bank += amount
    userData.cooldowns.daily = Date.now() + (1000 * 60 * 60 * 12)
    userData.save()

    return where.reply({ embeds: [justAText('C.U. bot services', 'FF0000').setDescription(`The value of \`💲 ${amount} \` was deposited in your bank account.`)] })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Get free money daily from the government"),
    run: async (interaction, client, typo) => {
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

        code(user, userData, interaction)
    },
    execute: async (message, client, input1, typo) => {
        const user = message.author
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })

        code(user, userData, message)
    }
}