const { readFileSync } = require("fs");
const { embed_404_error_message } = require("../assets/embeds/global");

module.exports = {
  name: "messageCreate",
  async execute(message, client, typo) {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    if (!message.content.toLowerCase().startsWith(client.prefix)) return;

    const args = message.content.slice(client.prefix.length).trim().split(/ +/);

    //Register commands on load
    const checkCommandAlts = (info) => {
      let alts = JSON.parse(
        readFileSync("./src/commands/aliases/cmds.json")
      );
      for (key in alts) {
        if (alts[key].indexOf(info) !== -1) {
          return key;
        }
      }
      return false;
    };
    const msg = args.shift().toLowerCase();

    const input1 = args[0];
    const commandName = await checkCommandAlts(msg);

    //Suggestion system when command spelling is wrong
    if (!client.commands.has(commandName)) {
      let [found, finder, name] = [0, {}]
      const commands = Object.keys(JSON.parse(readFileSync("./src/commands/aliases/cmds.json")))

      for (comando of commands) {
        finder[comando] = 0;
        for (letra of comando) {
          if (msg.indexOf(letra) !== -1) {
            finder[comando]++;
          }
        }
      }
      Object.entries(finder).map(e => e[1] > found ? [found, name] = [e[1], e[0]] : '')

      return message.channel.send({
        embeds: [
          embed_404_error_message(
            `command not found! Try \`${client.prefix}${name === "" ? "comandos" : name}\` `),
        ],
      });
    } else {
      const command = client.commands.get(commandName);
      try {
        command.execute(message, client, input1, args, typo);
      } catch (err) {
        console.log(err);
      }
    }
  },
};
