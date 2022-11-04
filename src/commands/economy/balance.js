const { SlashCommandBuilder } = require('discord.js')
const { balanceEmbed } = require('../../assets/embeds/economy')
const { User } = require('../../models/schemas')

const code = (user, userData, where, client) => {
    return where.reply({
        embeds:[balanceEmbed(client.users.cache.get(user.id), userData)]
    })
}

module.exports = {
    name: 'balance',
    data: new SlashCommandBuilder()
    .setName('balance') 
    .setDescription(`Shows your balance or anothers user's balance`)
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("Person who you want to check")
    ),
    run: async (interaction, client, typo) => {
        const user = interaction.options.getUser("user") || interaction.member.user
        const userData = await User.findOne({id:user.id}) || new User ({id:user.id})
        
        code(user, userData, interaction, client)
    },
    execute: async(message,client,input1, typo) =>{
        const user = input1 === undefined ? message.author : client.users.cache.get(input1.slice(2, input1.length-1)) === undefined ? message.author : client.users.cache.get(input1.slice(2, input1.length-1))
        const userData = await User.findOne({id:user.id}) || new User ({id:user.id})
        
        code(user, userData, message, client)
    }
}