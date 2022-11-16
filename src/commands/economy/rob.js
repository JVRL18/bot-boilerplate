const { SlashCommandBuilder } = require('discord.js')
const { embed_404_error_message } = require('../../assets/embeds/global')
const { User } = require('../../models/schemas')
const { Perk } = require('../../models/economy')
const code = (user, userData, target, interaction) => {
    const rob_amount = Math.floor(Math.floor((target.wallet * (Math.floor(Math.random() * 9) + 1) / 10)/(2 - userData.perks.robbery.level/100)))
    
    
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rob')
        .setDescription('Robs someone or something with some risk')
        .addUserOption((option) =>
            option.setName('user').setDescription('Select the user that you want to rob').setRequired(true)),
    run: async (interaction, client, typo) => {
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const robbery = userData?.perks?.robbery

        if(robbery === undefined){
            await userData.updateOne(
                {
                    "$set": {
                        [`perks.robbery`]: new Perk({name:'robbery'}).build()
                    }
                })
        }
        console.log(userData)
        if (robbery.level < 5 && interaction.options.getUser('user') !== undefined) return interaction.reply({
            embeds: [embed_404_error_message(`your robbery perk level **\`${robbery.level}\`** is too low to do that, min: **\`5\`**`)],
            ephemeral: true
        })
        const targetData = await User.findOne({ id: user.id }) || new User({ id: user.id })
 
        code(user, userData, targetData, interaction)
    },
    execute: async (message, client, input1, typo) => {
        const user = interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const robbery = userData?.perks?.robbery
        if(robbery === undefined){
            await userData.updateOne(
                {
                    "$set": {
                        [`perks.robbery`]: new Perk({name:'robbery'}).build()
                    }
                })
        }
        if (robbery.level < 5 && input1 !== undefined) return interaction.reply({
            embeds: [embed_404_error_message(`your robbery perk level **\`${robbery.level}\`** is too low to do that, min: **\`5\`**`)],
            ephemeral: true
        })
        
        const targetData = await User.findOne({ id: user.id }) || new User({ id: user.id })

        code(user, userData, targetData, message)
    }
}