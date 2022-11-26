const { SlashCommandBuilder } = require("discord.js");
const { shuffle_message_embed } = require('./_embeds')
const code = async (i, client) => {
    const user = i.user?.username || i.author?.username
    const tag = i.user?.discriminator || i.author?.discriminator
    const { player }  = require('../../../index')
    const queue = player.getQueue(i.guildId)

    if (!i.member.voice.channel) return await i.channel.send({ content: 'You should be on a voice chat to request songs.', ephemeral: true })
    if(!queue || !queue.playing || queue.tracks.length <= 1) return await i.reply({ content: "Doesn't have any music on playlist", ephemeral:true })

    queue.shuffle()

    const { title, url, author, duration, thumbnail } = queue.tracks[0]
    const data = {
        text:`🎶 | Next song: [${title}](${url})\n🔎 | ** Song by: ${author}** **\`[${duration}]\`**`,
        thumb:thumbnail,
        fText:`Queue shuffled by: ${user+"#"+tag}`,
        icon:`${client.users.cache.get(i.user?.id || i.author?.id).displayAvatarURL()}`
    }

    await i.reply({ embeds:[shuffle_message_embed(data)] })
}

module.exports = {
    data: new SlashCommandBuilder().setName("shuffle").setDescription("Shuffle the playlist"),
    run: (interaction, client) => {
        code(interaction, client);
    },
    execute: async (message, client) => {
        await message.delete().catch(err => {})
        code(message, client);
    },
}