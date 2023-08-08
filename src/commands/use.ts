import { Collection, Events, Interaction } from "discord.js";

const failReply = {
	content:
		"<:error:1049228381486583819> There was an error while executing this command!",
	ephemeral: true,
};

export default async function useSlashCommands(client, commands) {
	//add commands to client
	client.commands = new Collection();
	for (const command of commands) {
		client.commands.set(command.data.name, command);
	}

	//listen for commands being run
	client.on(Events.InteractionCreate, async (interaction: Interaction) => {
		if (!interaction.isChatInputCommand()) return;

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
		`Client listening for ${commands.length} application (/) commands.`
	);
}
