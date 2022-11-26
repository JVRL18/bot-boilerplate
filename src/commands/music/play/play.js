const { SlashCommandBuilder } = require("discord.js");
const { Guild } = require("../../../models/schemas")
const { QueryType } = require('discord-player')
const { single_music_play_embed, mult_music_play_embed } = require('./_embeds.js')

const code = async (i, client, url) => {
  if (i.type === 2) await i.deferReply().catch(err => { return })

  if (!i.member.voice.channel) return await i.channel.send({ content: 'You should be on a voice chat to request songs.', ephemeral: true })
  const queue = await client.player.createQueue(i.guild)

  //user or author to change when using slash or message
  const result = await client.player.search(url, {
    requestedBy: i.user || i.author,
    searchEngine: QueryType.AUTO,
  })
  if (result.tracks.length === 0) return await i.channel.send({ content: 'no results' })

  const { tracks } = result

  result.playlist === null ? await queue.addTrack(tracks[0]) : await queue.addTracks(tracks)

  if (!queue.connection) await queue.connect(i.member.voice.channel).catch(err => { return })
  if (!queue.playing) await queue.play()

  const guildData = await Guild.findOne({ id: i.guild.id }) || new Guild({ id: i.guild.id, isPlaying: false, musicChannel: null })

  //needs to move this into the if when the playlist end() is created
  guildData.musicChannel = i.channel.id
  guildData.isPlaying = true
  await guildData.save()

  if (guildData.musicChannel === null) {
  }
  //working on

  if (result.playlist === null) {
    let content = { embeds: [single_music_play_embed(tracks[0])] }

    if (i.type === 2) return i.editReply(content)
    i.reply(content)

  } else {
    let content = { embeds: [mult_music_play_embed(result.playlist, tracks)] }

    if (i.type === 2) return i.editReply(content)
    i.reply(content)

  }

};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays the url song")
    .addStringOption(
      (option) => option.setName('url').setDescription('Song to play URL').setRequired(true)),
  run: (interaction, client, typo) => {

    code(interaction, client, interaction.options.getString('url'));
  },
  execute: (message, client, input1, inputs, typo) => {
    code(message, client, message.content);
  },
};