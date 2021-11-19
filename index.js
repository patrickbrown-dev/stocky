import { Client, Intents, MessageEmbed } from 'discord.js';
import  dotenv from 'dotenv';
import finnhub from 'finnhub';

dotenv.config();
const token = process.env.DISCORD_BOT_TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_API_KEY;;
const finnhubClient = new finnhub.DefaultApi()


client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'quote') {
		const ticker = interaction.options.getString('ticker').toUpperCase();

		await interaction.deferReply()
		let i = interaction;
		finnhubClient.quote(ticker, (_e, data, _r) =>{
			const embed = new MessageEmbed()
				.setColor('#3ba55c')
				.setTitle(`${ticker} Quote`)
				.setDescription(`Here is how ${ticker} has been performing today.`)
				.addFields(
					{ name: 'Current', value: `$${data["c"]}`, inline: true },
					{ name: 'Change', value: `$${data["d"]}`, inline: true },
					{ name: 'Percent Change', value: `${data["dp"]}%`, inline: true },
					{ name: 'High', value: `$${data["h"]}`, inline: true },
					{ name: 'Low', value: `$${data["l"]}`, inline: true },
					{ name: 'Open', value: `$${data["o"]}`, inline: true },
					{ name: 'Previous Close', value: `$${data["pc"]}`, inline: true },
				);
			i.editReply({embeds: [embed]});
		});
	}
});

client.login(token);