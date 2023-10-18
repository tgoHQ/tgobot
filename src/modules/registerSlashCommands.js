import { REST, Routes } from "discord.js";

export default async function registerSlashCommands(commands) {
	const CLIENT_ID = process.env.CLIENT_ID;
	const GUILD_ID = process.env.GUILD_ID;
	const TOKEN = process.env.TOKEN;

	// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(TOKEN);

	//get command data
	const commandData = [];
	for (const command of commands) {
		commandData.push(command.data.toJSON());
	}

	// The put method is used to fully refresh all commands in the guild with the current set
	const data = await rest.put(
		Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
		{ body: commandData }
	);

	console.log(`Registered ${data.length} application (/) commands.`);

	return;
}