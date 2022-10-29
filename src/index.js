const fs = require("fs");
const Discord = require("discord.js");
const { Client, IntentsBitField } = require("discord.js");
const mongoose = require('mongoose')
require("dotenv").config();

const myIntents = new IntentsBitField();
myIntents.add(
	IntentsBitField.Flags.Guilds,
	IntentsBitField.Flags.GuildMessages,
	IntentsBitField.Flags.GuildMessageReactions,
	IntentsBitField.Flags.MessageContent
);

const client = new Client({ intents: myIntents });
client.prefix = process.env.PREFIX
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

	const command = require(`./commands/${file}`);

	client.commands.set(command.name === undefined ? command.data.name : command.name, command);

}

for (const file of eventFiles) {

	const event = require(`./events/${file}`);

	if (event.once) {

		client.once(event.name, (...args) => event.execute(...args, client));

	} else {

		client.on(event.name, data => {

			if (data.type === 2) {
				event.execute(data, client, 'slash')
			}
			if (data.type === 0) {
				event.execute(data, client, 'message')
			}
		})
		
	}
}

client.login(process.env.BOT_KEY).then(async () => {
	console.log('Bot está online\n')
	await mongoose.connect(
		process.env.MONGO_URI || '', {
		keepAlive: true,
	}
	)
	console.log('Conectado a DB')
});