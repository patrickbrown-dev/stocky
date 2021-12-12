import { CommandInteraction, MessageEmbed } from "discord.js";
import { CommandHandler } from "./CommandHandler";
import { StockyGreen } from "./HandlerHelpers";

export class BasicFinancialsHandler implements CommandHandler {
    finnhubClient: any;

    constructor(finnhubClient: any) {
        this.finnhubClient = finnhubClient;
    }

    async handle(interaction: CommandInteraction) {
        let symbol: string | null = interaction.options.getString('symbol');
        if (symbol === null) {
            console.error('symbol is null');
            return;
        }
        symbol = symbol.toUpperCase();

        await interaction.deferReply()

        const basicFinancials = await this.finnhubClient.getBasicFinancials(symbol);

        const embed = new MessageEmbed()
            .setColor(StockyGreen)
            .setTitle(`${symbol} Basic Finanicals`)
            .setDescription(`Here are some ${symbol}'s financials such as 52-week high/low.`)
            .addFields(
                { name: '10 Day Average Trading Volume', value: `$${basicFinancials.tenDayAverageTradingVolume}` },
                { name: '52 Week High', value: `$${basicFinancials.fiftyTwoWeekHigh}`, inline: true },
                { name: '52 Week Low', value: `$${basicFinancials.fiftyTwoWeekLow}`, inline: true },
                { name: '52 Week Low Date', value: `${basicFinancials.fiftyTwoWeekLowDate}` },
                { name: '52 Week Price Return Daily', value: `$${basicFinancials.fiftyTwoWeekPriceReturnDaily}`, inline: true },
                { name: 'beta', value: `${basicFinancials.beta}`, inline: true },
            );

        interaction.editReply({ embeds: [embed] });
    }
}