const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs")
const code = (i, client) => {
    const commands = JSON.parse(fs.readFileSync('./src/commands/aliases/cmds.json'))
    let list = ''

    for (key in commands) {
        list += `\`[${key}]\` `
    }

    return i.reply(`${list.trim()}`);
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cmds")
        .setDescription("Get the command list"),
    run: (interaction, client, typo) => {
        code(interaction, client);
    },
    execute: (message, client, input1, typo) => {
        code(message, client);
    },
    aliases: ["ms"],
};



