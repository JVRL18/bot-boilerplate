const fs = require("fs");
const Discord = require("discord.js");
const { Client, IntentsBitField } = require("discord.js");
const mongoose = require("mongoose");
const { Player } = require('discord-player')
require("dotenv").config();

const myIntents = new IntentsBitField();
myIntents.add(
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.GuildMessageReactions,
  IntentsBitField.Flags.MessageContent,
  IntentsBitField.Flags.GuildVoiceStates
);
const { token, MONGO_URI, prefix } = require("./config.json");

const client = new Client({ intents: myIntents });
client.prefix = prefix;
client.commands = new Discord.Collection();
client.buttons = new Discord.Collection();
client.player = new Player(client, {
  ytdlOptions:{
    quality:"highestaudio",
    highWaterMark: 1 << 25
  }
})

const commandFiles = [];

(findCommands = async (path = "commands") => {
  fs.readdirSync(`./src/${path}`).filter(async (file) => {
    if (file === "aliases") return;
    if (file.endsWith(".js")) return commandFiles.push(file);
    findCommands(path + `/${file}`);
  });
})();

const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  let commander;
  const getCommands = (name, path = "commands") => {
    const dirr = `./src/${path}`;

    fs.readdirSync(dirr).filter((find) => {
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

client.login(token).then(async () => {
  console.log("Bot Status: ONLINE\n");
  await mongoose.connect(MONGO_URI || "", {
    keepAlive: true,
  });
  console.log("\nDataBase connected.");
});
