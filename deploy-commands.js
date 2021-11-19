import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenv from 'dotenv';

dotenv.config();
const token = process.env.DISCORD_BOT_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;

const commands = [
    new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Get real-time quote data for US stocks.')
        .addStringOption(option =>
            option.setName('symbol')
                .setDescription('The symbol to quote')
                .setRequired(true)),
    new SlashCommandBuilder()
        .setName('basic_financials')
        .setDescription('Get company basic financials such as margin, P/E ratio, 52-week high/low etc.')
        .addStringOption(option =>
            option.setName('symbol')
                .setDescription('The symbol to quote')
                .setRequired(true)),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);