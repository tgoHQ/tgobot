import { Collection, Client, Events } from "discord.js";

/**
 * @param {Client} client
 * @param {*} commands
 */
export default async function useSlashCommands(client, commands) {
	//add commands to client
	client.commands = new Collection();
	for (const command of commands) {
		client.commands.set(command.data.name, command);
	}

	//listen for commands being run
	client.on(Events.InteractionCreate, async (interaction) => {
		if (!interaction.isChatInputCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: "There was an error while executing this command!",
					ephemeral: true,
				});
			} else {
				await interaction.reply({
					content: "There was an error while executing this command!",
					ephemeral: true,
				});
			}
		}
	});
}
