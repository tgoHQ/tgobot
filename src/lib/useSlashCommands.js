import { Collection, Events } from "discord.js";
import slashCommands from "../slashCommands/index.js";
import contextCommands from "../contextCommands/index.js";
import client from "./client.js";

const failReply = {
	content:
		"<:error:1049228381486583819> There was an error while executing this command!",
	ephemeral: true,
};

export default async function useSlashCommands() {
	//add commands to client

	const commands = [...slashCommands, ...contextCommands];

	const commandsCollection = new Collection();
	for (const command of commands) {
		commandsCollection.set(command.data.name, command);
	}
	client.commands = commandsCollection;


	//listen for commands being run
	client.on(Events.InteractionCreate, async (interaction) => {
		if (
			!(interaction.isChatInputCommand() || interaction.isContextMenuCommand())
		)
			return;

		const command = client.commands.get(interaction.commandName);

		if (!command) {
			console.error(
				`No command matching ${interaction.commandName} was found.`
			);
			return await interaction.reply(failReply);
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`, error);

			if (interaction.replied || interaction.deferred) {
				return await interaction.followUp(failReply);
			}

			await interaction.reply(failReply);
		}
	});

	console.log(
		`Client listening for ${slashCommands.length} slash commands and ${contextCommands.length} context commands.`
	);
}
