const { Client, IntentsBitField, Collection } = require("discord.js");
const { token, MONGO_URI, prefix } = require("./config.json");
const { Player } = require('discord-player')
const { connect } = require("mongoose");
const { readdirSync } = require("fs");
const { loadEvents } = require('./configs/utils/botLoad')

const myIntents = new IntentsBitField();
myIntents.add(
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.GuildMessageReactions,
  IntentsBitField.Flags.MessageContent,
  IntentsBitField.Flags.GuildVoiceStates
);

const client = new Client({ intents: myIntents });
client.prefix = prefix;
client.commands = new Collection();
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25
  }
})

//commands loader
const commandFiles = [];
(findCommands = async (path = "commands") => {
  readdirSync(`./src/${path}`).filter(async (file) => {
    if (file === "aliases") return;
    if (file === "_embeds.js") return;
    if (file.endsWith(".js")) return commandFiles.push(file);
    findCommands(path + `/${file}`);
  });
})();

for (const file of commandFiles) {
  let commander;
  const getCommands = (name, path = "commands") => {
    const dirr = `./src/${path}`;

    readdirSync(dirr).filter((find) => {
      if (find === name) {
        commander = `./${path}/${find}`;
      } else {
        if (find.endsWith("js") === true) return;
        if (find === "aliases") return;
        return getCommands(name, path + `/${find}`);
      }
    });
  };
  getCommands(file);

  const command = require(commander);
  client.commands.set(
    command.name === undefined ? command.data.name : command.name,
    command
  );
}

//normal events loader
const eventFiles = readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    if (event.name === "voiceStateUpdate") {
      client.on("voiceStateUpdate", (oldconnect, newconnect) => {
        event.execute(oldconnect, newconnect, client);
      });
    } else {
      client.on(event.name, (data) => {
        if (data.type === 2) {
          event.execute(data, client, "slash");
        }
        if (data.type === 0) {
          event.execute(data, client, "message");
        }
      });
    }
  }
}

client.login(token)
  .then(async () => {
    console.log(`[!] Bot Status: ONLINE\n`)

    //export client for acessing into events_custom and loading.
    module.exports = client
    loadEvents(client)
    
    await connect(MONGO_URI || "", { keepAlive: true })
      .then(res => console.log("\n[!] DataBase status: ONLINE\n"))
      .catch(err => console.log("DataBase login err: " + err))
  })
  .catch(err => console.log("Bot login err: " + err))