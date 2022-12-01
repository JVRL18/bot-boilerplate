const { SlashCommandBuilder } = require('discord.js')
const { User, Guild } = require('../../../models/schemas')
const { Track } = require('discord-player')
const { mult_music_play_embed } = require('./_embeds.js');
const { verify, check } = require('../../../configs/utils/debug');

const code = async (user, i) => {
    const { player } = require('../../../index')

    if (!i.member.voice.channel) return await i.reply({ content: 'You should be on a voice chat to do that', ephemeral: true })

    const guildData = await Guild.findOne({ id: i.guild.id }) || new Guild({ id: i.guild.id })

    if(await verify(i)) return

    if (i.type === 2) await i.deferReply().catch(err => { return })

    const queue = player.getQueue(i.guild.id) || player.createQueue(i.guild)

    const userData = await User.findOne({ id: user.id }) || new User({ id: user.id})

    if (userData.favorites.length === 0) {
        if (i.type === 2) return await i.editReply({ content: 'no favorites saved', ephemeral: true })
        await i.reply({ content: 'no favorites saved', ephemeral: true })
    }

    const tracks = userData.favorites.map(e => new Track(player, {
        title: e.title,
        description: e.track.description,
        author: e.track.author,
        url: e.url,
        thumbnail: e.track.thumbnail,
        duration: e.track.duration,
        views: e.track.views,
        requestedBy: user,
        source: "youtube",
        live: false
    }))

    queue.addTracks(tracks)

    if (!queue.connection) await queue.connect(i.member.voice.channel).catch(err => { return })
    if (!queue.playing) await queue.play()

    if (guildData.musicChannel === null) {

        reload.musicChannel = i.channel.id
        reload.isPlaying = true
        reload.voiceChannel = i.member.voice.channel.id

        await guildData.save()
        
    }

    let content = { embeds: [mult_music_play_embed(tracks)] }

    if (i.type === 2) return i.editReply(content)
    i.reply(content)

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('favorites')
        .setDescription('Add your favorites songs to the queue'),
    run: async (interaction, client, typo) => {
        const user = interaction.user

        code(user, interaction)
    },
    execute: async (message, client, input1, typo) => {
        const user = message.author

        code(user, message)
    }
}