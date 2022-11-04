const { SlashCommandBuilder } = require('discord.js')
const { success_give_transaction } = require('../../assets/embeds/economy')
const { embed_404_error_message } = require('../../assets/embeds/global')
const { User } = require('../../models/schemas')

const code = async (user, userData, where, client, reciver, reciverData, amount) => {
    if (userData.wallet < amount) return where.reply({ embeds: [embed_404_error_message(`sorry, you don't have enough, actual: \`${userData.wallet}\``)] })

    userData.wallet -= amount
    reciverData.wallet += amount
    userData.save()
    reciverData.save()
        
    await where.channel.send({
        content: `||<@${user.id}>, <@${reciver.id}>||`,
        embeds:[success_give_transaction(
            {
                bal: userData.wallet, 
                username:user.username
            },
            {
                bal: reciverData.wallet, 
                username:reciver.username
            },
            amount
        )]
    })

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('give')
        .setDescription(`Send money for someone.`)
        .addUserOption((option) =>
            option.setName('user').setDescription('Select the user that will recive the money').setRequired(true))
        .addIntegerOption((option) => option.setName('amount').setDescription('Amount to give').setRequired(true)),
    run: async (interaction, client, typo) => {
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const reciver = interaction.options.getUser("user")
        const reciverData = await User.findOne({ id: reciver.id }) || new User({ id: reciver.id })

        code(user, userData, interaction, client, reciver, reciverData, interaction.options.getInteger('amount'))
    },
    execute: async (message, client, input1, inputs, typo) => {
        if (inputs[0] === undefined || inputs[1] === undefined) return message.reply({ embeds: [embed_404_error_message('You should specify the amount and a valid user.')], ephemeral: true })
        const reciver = await client?.users?.cache.get(inputs[1].slice(2, inputs[1].length - 1))
        const user = message.author
        if (reciver === undefined) return message.reply({ embeds: [embed_404_error_message('You should specify a valid user.')] })
        if (Number(inputs[0]) <= 0) return message.reply({ embeds: [embed_404_error_message("You should specify the amount.")] })

        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const reciverData = await User.findOne({ id: reciver.id }) || new User({ id: reciver.id })

        code(user, userData, message, client, reciver, reciverData, Number(inputs[0]))
    }
}