import {
	ContextMenuCommandBuilder,
	ContextMenuCommandInteraction,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction,
} from "discord.js";

type ContextCommand = {
	data: ContextMenuCommandBuilder;
	execute(interaction: ContextMenuCommandInteraction): Promise<void> | void;
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
