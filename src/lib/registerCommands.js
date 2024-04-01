import env from "./env.js";
import { REST, Routes } from "discord.js";
import commands from "../slashCommands/index.js";
import contextCommands from "../contextCommands/index.js";

export default async function registerCommands() {
	// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(env.TOKEN);

	//get command data
	const commandData = [];
	for (const command of commands) {
		commandData.push(command.data.toJSON());
	}
	for (const contextCommand of contextCommands) {
		commandData.push(contextCommand.data.toJSON());
	}

	// rest
	// 	.put(Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID), {
	// 		body: [],
	// 	})
	// 	.then(() => console.log("Successfully deleted all guild commands."))
	// 	.catch(console.error);

	// rest
	// 	.put(Routes.applicationCommands(env.CLIENT_ID), { body: [] })
	// 	.then(() => console.log("Successfully deleted all application commands."))
	// 	.catch(console.error);

	// The put method is used to fully refresh all commands in the guild with the current set
	const data = await rest.put(
		Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID),
		{ body: commandData }
	);

	console.log(`Registered ${data.length} application commands.`);
}
