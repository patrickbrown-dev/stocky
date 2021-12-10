import { Client, Intents, MessageEmbed } from 'discord.js';
import  dotenv from 'dotenv';
import finnhub from 'finnhub';
import { CommandRouter } from './CommandRouter';
import { BasicFinancialsHandler } from './handlers/BasicFinancialsHandler';
import { QuoteHandler } from './handlers/QuoteHandler';

dotenv.config();
const token = process.env.DISCORD_BOT_TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const apiKey = finnhub.ApiClient.instance.authentications['api_key'];
apiKey.apiKey = process.env.FINNHUB_API_KEY;;
const finnhubClient = new finnhub.DefaultApi()
const commandRouter = new CommandRouter();

commandRouter.register('quote', new QuoteHandler(finnhubClient));
commandRouter.register('basic_financials', new BasicFinancialsHandler(finnhubClient));

client.once('ready', () => console.log('Ready!'));

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return
	commandRouter.route(interaction.commandName, interaction);
});

client.login(token);