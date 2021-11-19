const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();
const token = process.env.DISCORD_BOT_TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'quote') {
		await interaction.reply('Pong!');
	}
});

client.login(token);