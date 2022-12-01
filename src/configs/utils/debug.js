const { Guild } = require("../../models/schemas")
const { not_in_voice_embed_error } = require('../../global_embeds/_embeds')
module.exports = {
    check: (info) => {
        const top = "\x1b[31m┏╋━━━━━━◥◣◆◢◤━━━━━━━╋┓"
        const bottom = "\x1b[31m┗╋━━━━━━◢◤◆◥◣━━━━━━━╋┛\n"
        console.log(`\n\n${top}\n\n\x1b[33m${info}\n\n${bottom}\n\n`)
    },
    verify: async (interaction) => {
        const guildData = await Guild.findOne({ id: interaction.guild.id }) || new Guild({ id: interaction.guild.id })
        const { check } = require('./debug')
        check(`${interaction.member.voice.channel.id}\n${guildData.voiceChannel}\n`)
        if (interaction.member?.voice?.channel?.id !== guildData.voiceChannel) {
            if (guildData.voiceChannel === null) return false

            await interaction.reply({ embeds: [not_in_voice_embed_error()], ephemeral: true })
            return true
            
        }
        return false
    }
}
