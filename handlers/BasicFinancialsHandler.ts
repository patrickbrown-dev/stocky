import { CommandInteraction, MessageEmbed } from "discord.js";
import { CommandHandler } from "./CommandHandler";

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
        let i = interaction;
        this.finnhubClient.companyBasicFinancials(symbol, 'all', (_e: any, data: any, _r: any) => {
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
}