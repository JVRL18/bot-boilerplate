const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    //register app commands
    let path = fs.readdirSync('./src/commands')
    let data = JSON.parse(fs.readFileSync('./src/commands/aliases/cmds.json'))
    for (key of path) {

      if (key.endsWith('.js') === false) {
        if (key === 'aliases') continue
        let newpath = fs.readdirSync(`./src/commands/${key}`)

        for (newkey of newpath) {
          if (newkey.endsWith('.js') === false) continue

          let name = newkey.split('').splice(0, newkey.length - 3).reduce((x, y) => x += y, '')
          if (data[name] === undefined) {
            data[name] = [name]
            fs.writeFileSync('./src/commands/aliases/cmds.json', JSON.stringify(data, null, 2))
          }
        }
      } else {
        let name = key.split('').splice(0, key.length - 3).reduce((x, y) => x += y, '')
        if (data[name] === undefined) {
          data[name] = [name]
          fs.writeFileSync('./src/commands/aliases/cmds.json', JSON.stringify(data, null, 2))
        } 
      }
    }

    const commandArgs = process.argv.find(arg => arg.startsWith("local=") || arg === "global")

    if (commandArgs) {
      const commands = [...client.commands].map(x => x[1].data)

      if (commandArgs.startsWith("local=")) {
        await client.guilds.fetch(commandArgs.split("=")[1]).then(async guild => await guild.commands.set(commands))
        return console.log('[!] Commands set locally')
      } else {
        await client.application.commands.set(commands)
        return console.log('[!] Commands set globally');
      }
    }
    
    //send hello
    let servers = client.guilds.cache.map((g) => g.name).length;
    const channel = client.channels.cache.get("1035675689204072448");
    x = servers > 1 ? "server" : "servers";

    let embed = new EmbedBuilder()
      .setColor("#00FF00")
      .setFooter({ text: `✔️ ONLINE! in ${servers} ${x}` })
      .setTimestamp();
    //channel.send({ embeds: [embed] });

  },
};
