import { Client, Intents } from 'discord.js';
import  dotenv from'dotenv';
import got from 'got';

dotenv.config();
const token = process.env.DISCORD_BOT_TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const finnhub_api_key = process.env.FINNHUB_API_KEY;

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'quote') {
		const ticker = interaction.options.getString('ticker');

		await interaction.deferReply()
		await got.get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${finnhub_api_key}`)
			.json()
			.then(json => interaction.editReply(`\`\`\`
${ticker}
	Current:    $${json["c"]}
	Change:     $${json["d"]}
	% Change:    ${json["dp"]}%
	High:       $${json["h"]}
	Low:        $${json["l"]}
	Open:       $${json["o"]}
	Prev Close: $${json["pc"]}
\`\`\``));
	}
});

client.login(token);