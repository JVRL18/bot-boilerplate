const { SlashCommandBuilder } = require('discord.js')
const { User } = require('../../models/schemas')
const { justAText, embed_404_error_message } = require('../../assets/embeds/global')
const { sucess_withdraw_transaction } = require('../../assets/embeds/economy')

const code = (user, userData, where, amount) => {
    if(userData.bank < amount) return where.reply({embeds:[embed_404_error_message(`You do not have this much on bank, bank money: \`${userData.bank}💸\``)], ephemeral:true})

    userData.bank -= amount
    userData.wallet += amount
    userData.save()

    return where.reply({embeds:[sucess_withdraw_transaction(amount)]})
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("withdraw")
        .setDescription("Takes your saved money on bank")
        .addIntegerOption((option) => option.setName('amount').setDescription('Amount to take off account').setRequired(true)),
    run: async (interaction, client, typo) => {
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const amount = interaction.options.getInteger("amount")

        code(user, userData, interaction, amount)
    },
    execute: async (message, client, input1, inputs, typo ) => {
        const user = message.author
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        if(Number(input1) != input1) return message.reply({embeds:[embed_404_error_message('Need to specify a valid number amount.')]})

        code(user, userData, message, Number(input1))
    }
}