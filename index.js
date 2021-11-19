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
		const symbol = interaction.options.getString('symbol').toUpperCase();

		await interaction.deferReply()
		let i = interaction;
		finnhubClient.quote(symbol, (_e, data, _r) =>{
			const embed = new MessageEmbed()
				.setColor('#3ba55c')
				.setTitle(`${symbol} Quote`)
				.setDescription(`Here is how ${symbol} has been performing today.`)
				.addFields(
					{ name: 'Current', value: `$${data.c}`, inline: true },
					{ name: 'Change', value: `$${data.d}`, inline: true },
					{ name: 'Percent Change', value: `${data.dp}%`, inline: true },
					{ name: 'High', value: `$${data.h}`, inline: true },
					{ name: 'Low', value: `$${data.l}`, inline: true },
					{ name: 'Open', value: `$${data.o}`, inline: true },
					{ name: 'Previous Close', value: `$${data.pc}`, inline: true },
				);
			i.editReply({embeds: [embed]});
		});
	} else if (interaction.commandName === 'basic_financials') {
		const symbol = interaction.options.getString('symbol').toUpperCase();

		await interaction.deferReply()
		let i = interaction;
		finnhubClient.companyBasicFinancials(symbol, 'all', (_e, data, _r) =>{
			const embed = new MessageEmbed()
				.setColor('#3ba55c')
				.setTitle(`${symbol} Basic Finanicals`)
				.setDescription(`Here are some ${symbol}'s financials such as 52-week high/low.`)
				.addFields(
					{ name: '10 Day Average Trading Volume', value: `${data.metric["10DayAverageTradingVolume"]}` },
					{ name: '52 Week High', value: `$${data.metric["52WeekHigh"]}`, inline: true },
					{ name: '52 Week Low', value: `$${data.metric["52WeekLow"]}`, inline: true },
					{ name: '52 Week Price Return Daily', value: `$${data.metric["52WeekPriceReturnDaily"]}` },
				);
			i.editReply({embeds: [embed]});
		});
	}
});

client.login(token);