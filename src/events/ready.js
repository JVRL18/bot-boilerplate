const { registerTextCommands } = require('../configs/utils/botLoad')

module.exports = {
  name: "ready",
  once: true,
  async execute(x) {
    const { client } = require("../index")
    //register app commands
    await registerTextCommands()

    const commands = [...client.commands].map(x => x[1].data)
    await client.application.commands.set(commands)

    return console.log( `\x1b[33m[!] [${commands.length}] Commands set for all guilds.`);

  },
};
