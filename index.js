const { Client, Intents } = require('discord.js');
const finnhub = require('finnhub');
const dotenv = require('dotenv');

dotenv.config();
const token = process.env.DISCORD_BOT_TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'quote') {
		const ticker = interaction.options.getString('ticker');

		finnhubClient.quote(ticker, (_error, data, _response) => {
			// TODO: I want this "data" ...
			console.log(data);
		});

		// ... to be returned here
		await interaction.reply("PONG");
	}
});

client.login(token);