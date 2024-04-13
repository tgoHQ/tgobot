import { Collection, Events } from "discord.js";
import slashCommands from "../../slashCommands/index.js";
import contextCommands from "../../contextCommands/index.js";
import client from "./client.js";
import { SlashCommand } from "../../slashCommands/index.js";
import {
	UserContextCommand,
	MessageContextCommand,
} from "../../contextCommands/index.js";
import { Emoji } from "../util/emoji.js";
const failReply = {
	content: `${Emoji.Error} There was an error while executing this command!`,
	ephemeral: true,
};

export default async function useApplicationCommands() {
	//add commands to client

	const commands: Collection<
		string,
		SlashCommand | UserContextCommand | MessageContextCommand
	> = new Collection();
	for (const command of [...slashCommands, ...contextCommands]) {
		commands.set(command.data.name, command);
	}

	//listen for commands being run
	client.on(Events.InteractionCreate, async (interaction) => {
		if (!interaction.isCommand()) return;

		const command = commands.get(interaction.commandName);

		if (!command) {
			console.error(
				`No command matching ${interaction.commandName} was found.`
			);
			await interaction.reply(failReply);
			return;
		}

		try {
			//todo
			//@ts-ignore
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`, error);

			if (interaction.replied || interaction.deferred) {
				await interaction.followUp(failReply);
				return;
			}

			await interaction.reply(failReply);
		}
	});

	console.log(
		`Client listening for ${slashCommands.length} slash commands and ${contextCommands.length} context commands.`
	);
}
