const { single_music_play_embed, mult_music_play_embed } = require('./_embeds.js');
const { verify } = require("../../../configs/utils/debug");
const { Guild } = require("../../../models/schemas.js");
const { display_search_query } = require("./_buttons");
const { SlashCommandBuilder } = require("discord.js");
const { QueryType } = require('discord-player')

const code = async (i, x, url) => {
  const { client, player } = require('../../../index')
  if (!i.member.voice.channel) return await i.reply({ content: 'You should be on a voice chat to request songs.', ephemeral: true })
  
  if(await verify(i)) return

  if (i.type === 2) await i.deferReply().catch(err => { return })
  
  const queue = await player.createQueue(i.guild)

  //user or author to change when using slash or message
  const result = await player.search(url, {
    requestedBy: i.user || i.author,
    searchEngine: QueryType.AUTO,
  })

  if (result.tracks.length === 0) {
    if(i.type === 2) return await i.editReply({ content: 'no results', ephemeral: true })
    await i.reply({ content: 'no results', ephemeral: true })
  }

  const { tracks } = result

  result.playlist === null ? await queue.addTrack(tracks[0]) : await queue.addTracks(tracks)

  if (!queue.connection) await queue.connect(i.member.voice.channel).catch(err => { return })
  if (!queue.playing) await queue.play()

  const reload = await Guild.findOne({ id: i.guild.id }) || new Guild({ id: i.guild.id, isPlaying: false, musicChannel: null })

  if (reload.musicChannel === null) {

    reload.musicChannel = i.channel.id
    reload.isPlaying = true
    reload.voiceChannel = i.member.voice.channel.id
    await reload.save()

  }

  if (result.playlist === null) {
    let content = { embeds: [single_music_play_embed(tracks[0])], components: [display_search_query()] }
    client.userTemp.set(`${i?.user?.id || i?.author?.id}`, tracks)

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
  run: (i, client, typo) => {

    code(i, client, i.options.getString('url'));

  },
  execute: (message, client, input1, inputs, typo) => {

    code(message, client, message.content);

  },
};