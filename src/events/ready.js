const { registerTextCommands } = require('../configs/utils/botLoad')

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    //register app commands
    registerTextCommands()

    const commands = [...client.commands].map(x => x[1].data)
    await client.application.commands.set(commands)

    return console.log('[!] Commands set for all guilds.');

  },
};
