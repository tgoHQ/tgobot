import { Collection, Events } from "discord.js";

import slashCommands from "./slash/index.js";
import contextCommands from "./context/index.js";

import client from "../lib/discord/client.js";
import { Emoji } from "../lib/util/emoji.js";

const failReply = {
	content: `${Emoji.Error} There was an error while executing this command!`,
	ephemeral: true,
};

const commandsCollection = new Collection();
for (const command of [...slashCommands, ...contextCommands]) {
	commandsCollection.set(command.data.name, command);
}

//listen for commands being run
client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = commandsCollection.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
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
