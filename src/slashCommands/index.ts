import type {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

/**
 * Defines the structure of a command
 */
export type SlashCommand = {
	/**
	 * The data for the command
	 */
	data:
		| Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
		| SlashCommandSubcommandsOnlyBuilder;
	/**
	 * The function to execute when the command is called
	 *
	 * @param interaction - The interaction of the command
	 */
	execute(interaction: ChatInputCommandInteraction): Promise<void> | void;
};

import about from "./general/about.js";
import help from "./general/help.js";
import vcping from "./general/vcping.js";
import grades from "./general/grades.js";
import gearlist from "./general/gearlist.js";
import snippet from "./general/snippet.js";

import clean from "./moderation/clean.js";
import timeout from "./moderation/timeout.js";
import slowmode from "./moderation/slowmode.js";
import infraction from "./moderation/infraction.js";

import ask from "./fun/ask.js";
import message from "./fun/message.js";
import showButton from "./general/showButton.js";
import ulAdvice from "./fun/ulAdvice.js";

export default [
	about,
	help,
	vcping,
	grades,
	gearlist,
	snippet,

	clean,
	timeout,
	slowmode,
	infraction,

	ask,
	message,
	ulAdvice,

	showButton,
];
