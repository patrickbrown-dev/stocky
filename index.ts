import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import { FinnhubClient } from './clients/FinnhubClient';
import { CommandRouter } from './CommandRouter';
import { BasicFinancialsHandler } from './handlers/BasicFinancialsHandler';
import { QuoteHandler } from './handlers/QuoteHandler';

dotenv.config();
const discordBotToken = process.env.DISCORD_BOT_TOKEN;
if (discordBotToken === undefined) {
	throw Error("Discord Bot Token undefined");
}
const discordClient = new Client({ intents: [Intents.FLAGS.GUILDS] });
const finnhubAPIKey = process.env.FINNHUB_API_KEY;
if (finnhubAPIKey === undefined) {
	throw Error("Finnhub API Key undefined");
}
const finnhubClient = new FinnhubClient(finnhubAPIKey);
const commandRouter = new CommandRouter();

commandRouter.register('quote', new QuoteHandler(finnhubClient));
commandRouter.register('basic_financials', new BasicFinancialsHandler(finnhubClient));

discordClient.once('ready', () => console.log('Ready!'));

discordClient.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	commandRouter.route(interaction.commandName, interaction);
});

discordClient.login(discordBotToken);