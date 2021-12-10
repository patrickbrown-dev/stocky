import { CommandInteraction } from "discord.js";

export interface CommandHandler {
    handle(interaction: CommandInteraction): void;
}