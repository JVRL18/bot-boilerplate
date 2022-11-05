const { SlashCommandBuilder } = require('discord.js')
const { User } = require('../../models/schemas')
const prettyMilliseconds = require('pretty-ms')
const { fail_begging, sucess_begging, cooldown_timer } = require('../../assets/embeds/economy')

const code = (user, userData, where) => {
    if (userData.cooldowns.beg > Date.now()) {
        return where.reply({ embeds: [cooldown_timer(`You're begging too much, wait **\`${prettyMilliseconds(userData.cooldowns.beg - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}\`**`)], ephemeral: true})
    }

    const amount = Math.floor((Math.round(10 / (Math.random() * 10 + 1)) * 10) / 2)

    if (amount <= 5) {
        userData.cooldowns.beg = Date.now() + (1000 * 60 )
        userData.save()

        return where.reply({
            embeds:[fail_begging(`${prettyMilliseconds(userData.cooldowns.beg - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}`)]
        })
    }

    userData.wallet += amount
    userData.cooldowns.beg = Date.now() + (1000 * 60)
    userData.save()

    //let give users some anxiety so they be a little addicted
    setTimeout(() => {
        return where.reply({ embeds: [sucess_begging(amount)] })
    }, 1500)
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("beg")
        .setDescription("Begs a random stranger for money"),
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