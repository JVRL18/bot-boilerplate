const { client } = require('../index.js')
const { Guild } = require('../models/schemas')
const { readdirSync } = require('fs')

client.on('interactionCreate', async interaction => {
  const guildData = await Guild.findOne({ id: interaction.guild.id })
  if (guildData === null) return

  const commandFiles = [];
  (findCommands = async (path = "commands_fixed") => {
    readdirSync(`./src/${path}`).filter(async (file) => {
      if (file === "aliases" || file.startsWith('_')) return;
      if (file.endsWith(".js")) return commandFiles.push(file);
      findCommands(path + `/${file}`);
    });
  })();

  for (const file of commandFiles) {
    let commander;
    const getCommands = (name, path = "commands_fixed") => {
      const dirr = `./src/${path}`;

      readdirSync(dirr).filter((find) => {
        if (find === name) {
          commander = `../${path}/${find}`;
        } else {
          if (find.endsWith("js") === true) return;
          if (find === "aliases" || find.startsWith("_")) return;
          return getCommands(name, path + `/${find}`);
        }
      });
    };
    getCommands(file);

    if(file.startsWith(interaction.customId)) require(commander).execute(interaction, client)
  }

})