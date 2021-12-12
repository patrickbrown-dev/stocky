import { CommandInteraction, MessageEmbed } from "discord.js";
import { FinnhubClient } from "../FinnhubClient/FinnhubClient";
import { CommandHandler } from "./CommandHandler";
import { StockyGreen } from "./HandlerHelpers";

export class QuoteHandler implements CommandHandler {
    finnhubClient: FinnhubClient;

    constructor(finnhubClient: FinnhubClient) {
        this.finnhubClient = finnhubClient;
    }

    async handle(interaction: CommandInteraction) {
        let symbol: string | null = interaction.options.getString('symbol');
        if (symbol === null) {
            console.error('symbol is null');
            return;
        }
        symbol = symbol.toUpperCase();

        await interaction.deferReply();

        const quote = await this.finnhubClient.getQuote(symbol);

        const embed = new MessageEmbed()
            .setColor(StockyGreen)
            .setTitle(`${symbol} Quote`)
            .setDescription(`Here is how ${symbol} has been performing today.`)
            .addFields(
                { name: 'Current', value: `$${quote.c}`, inline: true },
                { name: 'Change', value: `$${quote.d}`, inline: true },
                { name: 'Percent Change', value: `${quote.dp}%`, inline: true },
                { name: 'High', value: `$${quote.h}`, inline: true },
                { name: 'Low', value: `$${quote.l}`, inline: true },
                { name: 'Open', value: `$${quote.o}`, inline: true },
                { name: 'Previous Close', value: `$${quote.pc}`, inline: true },
            );

        interaction.editReply({ embeds: [embed] });
    }
}