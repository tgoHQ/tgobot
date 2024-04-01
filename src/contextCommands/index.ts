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
	execute(interaction: MessageContextMenuCommandInteraction): Promise<void> | void;
}
export interface UserContextCommand extends ContextCommand {
	execute(interaction: UserContextMenuCommandInteraction): Promise<void> | void;
}

import test from "./general/context.js";
export default [test];
