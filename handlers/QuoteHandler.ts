import { CommandInteraction, MessageEmbed } from "discord.js";
import { CommandHandler } from "./CommandHandler";
import { StockyGreen } from "./HandlerHelpers";

export class QuoteHandler implements CommandHandler {
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

        await interaction.deferReply();
        let i = interaction;
        this.finnhubClient.quote(symbol, (_e: any, data: any, _r: any) => {
            const embed = new MessageEmbed()
                .setColor(StockyGreen)
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
    }
}