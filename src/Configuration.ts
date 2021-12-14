import dotenv from 'dotenv';

export class Configuration {
    private static instance: Configuration;
    discordBotToken: string;
    discordClientId: string;
    finnhubAPIKey: string;

    private constructor() {
        dotenv.config();
        const discordBotToken = process.env.DISCORD_BOT_TOKEN;
        if (discordBotToken === undefined) {
            throw Error("DISCORD_BOT_TOKEN undefined");
        }
        this.discordBotToken = discordBotToken;

        const discordClientId = process.env.DISCORD_CLIENT_ID;
        if (discordClientId === undefined) {
            throw Error("DISCORD_CLIENT_ID undefined");
        }
        this.discordClientId = discordBotToken;

        const finnhubAPIKey = process.env.FINNHUB_API_KEY;
        if (finnhubAPIKey === undefined) {
            throw Error("FINNHUB_API_KEY undefined");
        }
        this.finnhubAPIKey = finnhubAPIKey;
    }

    public static getInstance(): Configuration {
        if (!Configuration.instance) {
            Configuration.instance = new Configuration();
        }

        return Configuration.instance;
    }
}