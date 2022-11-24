const { SlashCommandBuilder } = require("discord.js");
const {EmbedBuilder } = require('discord.js')
const { QueryType } = require('discord-player')
const code = async (i, client, url) => {
    if(!i.member.voice.channel) return await i.reply({content:'You should be on a voice chat to request songs.', ephemeral:true})

    const queue = await client.player.createQueue(i.guild)
    if(!queue.connection) await queue.connect(i.member.voice.channel)

    let embed = new EmbedBuilder()

    // console.log(client.player.queues.map(e => e))

    const result = await client.player.search(url,{
        requestedBy: i.user,
        searchEngine: QueryType.AUTO
    })

    if(result.tracks.length === 0) return await i.reply({content:'no results'})
    const song = result.tracks
    
    const music = result.playlist === null ? await queue.addTrack(result.tracks[0]) : await queue.addTracks(result.tracks)

    const timer = result.playlist === null ? song[0].duration : 'Um bom tempo ai kkkkk'
    const addedName = result.playlist === null ? song[0].title : result.playlist.title
    const addedUrl = result.playlist === null ? song[0].url : result.playlist.url
    const addedType = result.playlist === null ? 'song' : 'playlist'
    const thumb = result.playlist === null ? song[0].thumbnail : result.playlist.thumbnail.url
    await i.reply({embeds:[embed.setDescription(`[${addedName}](${addedUrl})\nAdded ${addedType} to queue: [${timer}]`).setThumbnail(thumb)]})

    if(!queue.playing) await queue.play()
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
  execute: (message, client, input1,inputs, typo) => {
    code(message, client,input1);
  },
};
