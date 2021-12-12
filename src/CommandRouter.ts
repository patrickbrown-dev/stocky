import { CommandInteraction } from "discord.js";
import { CommandHandler } from "./CommandHandlers/CommandHandler";

export class CommandRouter {
    commands: Map<string, CommandHandler> = new Map<string, CommandHandler>();

    register(command: string, handler: CommandHandler) {
        this.commands.set(command, handler);
    }

    route(command: string, interaction: CommandInteraction) {
        const handler: CommandHandler | undefined = this.commands.get(command);

        if (handler) {
            console.info(`(id:${interaction.id},guildId:${interaction.guildId}): Routing "${command}" to ${handler.constructor.name}`);
            handler.handle(interaction);
        } else {
            console.error(`command ${command} not a registered command`);
        }
    }
}