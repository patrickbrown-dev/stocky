import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import { FinnhubClient } from './FinnhubClient/FinnhubClient';
import { CommandRouter } from './CommandRouter';
import { BasicFinancialsHandler } from './CommandHandlers/BasicFinancialsHandler';
import { QuoteHandler } from './CommandHandlers/QuoteHandler';
import { Configuration } from './Configuration';

dotenv.config();
const configuration = Configuration.getInstance();
const discordClient = new Client({ intents: [Intents.FLAGS.GUILDS] });
const finnhubClient = new FinnhubClient(configuration.finnhubAPIKey);
const commandRouter = new CommandRouter();

commandRouter.register('quote', new QuoteHandler(finnhubClient));
commandRouter.register('basic_financials', new BasicFinancialsHandler(finnhubClient));

discordClient.once('ready', () => console.log('Ready!'));

discordClient.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	commandRouter.route(interaction.commandName, interaction);
});

discordClient.login(configuration.discordBotToken);