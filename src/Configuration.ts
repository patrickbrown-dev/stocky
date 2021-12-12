export class Configuration {
    private static instance: Configuration;
    discordBotToken: string;
    finnhubAPIKey: string;

    private constructor() {
        const discordBotToken = process.env.DISCORD_BOT_TOKEN;
        if (discordBotToken === undefined) {
            throw Error("Discord Bot Token undefined");
        }
        this.discordBotToken = discordBotToken;

        const finnhubAPIKey = process.env.FINNHUB_API_KEY;
        if (finnhubAPIKey === undefined) {
            throw Error("Finnhub API Key undefined");
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