import { REST, Routes } from "discord.js";

export default async function registerSlashCommands(commands) {
	const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
	const GUILD_ID = process.env.DISCORD_GUILD_ID;
	const TOKEN = process.env.DISCORD_BOT_TOKEN;

	// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(TOKEN);

	const commandData = [];
	for (const command of commands) {
		commandData.push(command.data.toJSON());
	}
	// and deploy your commands!
	(async () => {
		try {
			console.log(
				`Started registering ${commandData.length} application (/) commands.`
			);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
				{ body: commandData }
			);

			console.log(
				`Successfully registered ${data.length} application (/) commands.`
			);

			return;
		} catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();
}
