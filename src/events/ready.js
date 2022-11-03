const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    //register app commands
    let path = fs.readdirSync("./src/commands");
    let data = JSON.parse(fs.readFileSync("./src/commands/aliases/cmds.json"));
    for (key in path) {
      if (!path[key].endsWith(".js")) continue;

      console.log("\nChecking commands...");
      let name = path[key]
        .split("")
        .splice(0, path[key].length - 3)
        .reduce((x, y) => (x += y), "");
      if (data[name] === undefined) {
        data[name] = [name];
        fs.writeFileSync(
          "./src/commands/aliases/cmds.json",
          JSON.stringify(data, null, 2)
        );
        console.log(`Registered command: ${name}`);
      } else {
        console.log("Command already registered.\n");
      }
    }

    const commandArgs = process.argv.find(
      (arg) => arg.startsWith("local=") || arg === "global"
    );

    if (commandArgs) {
      const commands = [...client.commands].map((x) => x[1].data);

      if (commandArgs.startsWith("local=")) {
        await client.guilds
          .fetch(commandArgs.split("=")[1])
          .then(async (guild) => await guild.commands.set(commands));
        return console.log("[!] Commands set locally");
      } else {
        await client.application.commands.set(commands);
        return console.log("[!] Commands set globally");
      }
    }

    let servers = client.guilds.cache.map((g) => g.name).length;
    x = "server";
    if (servers > 1) {
      x = "servers";
    }
  },
};
