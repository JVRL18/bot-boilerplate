const { SlashCommandBuilder } = require("discord.js");
const { skip_song_embed } = require("./_embeds")
const { verify } = require("../../../configs/utils/debug");

const code = async (i, x) => {
    const { player,client } = require('../../../index')
    const user = i?.user || i?.author
    const queue = player.getQueue(i.guildId)

    if (!queue || !queue.playing) return await i.reply({ content: "Doesn't have any music on playlist", ephemeral:true })

    if(await verify(i)) return
    
    if(!i.member.permissions.has('Administrator')){
        if (queue.current.requestedBy.id !== user.id) return i.reply({ content: "You can't do that.", ephemeral:true })
    }
    queue.skip()
    await i.reply({ embeds: [skip_song_embed(queue.current, user)] })
}

module.exports = {
    data: new SlashCommandBuilder().setName("skip").setDescription("skip a music on playlist"),
    run: (i, client) => {
        code(i, client);
    },
    execute: (message, client) => {
        code(message, client);
    },
}