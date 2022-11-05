const { SlashCommandBuilder } = require('discord.js')
const { User } = require('../../models/schemas')
const prettyMilliseconds = require('pretty-ms')
const { justAText } = require('../../assets/embeds/global')
const { daily_sucess_embed, daily_cooldown_embed } = require('../../assets/embeds/economy')

const code = (user, userData, where) => {
    if (userData.cooldowns.daily > Date.now()) {
        return where.reply({embeds:[daily_cooldown_embed(user ,prettyMilliseconds(userData.cooldowns.daily - Date.now(), { verbose: true, secondsDecimalDigits: 0 }))], ephemeral:true})
    }

    const amount = 395
    userData.bank += amount
    userData.cooldowns.daily = Date.now() + (1000 * 60 * 60 * 12)
    userData.save()

    return where.reply({ embeds: [daily_sucess_embed(user,amount)] })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Recives free money from government"),
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