import {
	ContextMenuCommandBuilder,
	ContextMenuCommandInteraction,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction,
} from "discord.js";
/**
 * Defines the structure of an event.
 */
type ContextCommand = {
	/**
	 * The function to execute when the command is run.
	 */
	execute(interaction: ContextMenuCommandInteraction): Promise<void> | void;
	data: ContextMenuCommandBuilder;
};

export interface MessageContextCommand extends ContextCommand {
	execute(
		interaction: MessageContextMenuCommandInteraction
	): Promise<void> | void;
}
export interface UserContextCommand extends ContextCommand {
	execute(interaction: UserContextMenuCommandInteraction): Promise<void> | void;
}

import context from "./general/context.js";
import gearlist from "./general/gearlist.js";

export default [context, gearlist] satisfies ContextCommand[];
