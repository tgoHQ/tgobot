import env from "../lib/util/env.js";
import { REST, Routes } from "discord.js";

import slashCommands from "./slash/index.js";
import contextCommands from "./context/index.js";

export default async function registerCommands() {
	// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(env.TOKEN);

	// // Delete all commands from main guild
	// rest
	// 	.put(Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID), {
	// 		body: [],
	// 	})
	// 	.then(() => console.log("Successfully deleted all guild commands."))
	// 	.catch(console.error);

	// // Delete all global commands
	// rest
	// 	.put(Routes.applicationCommands(env.CLIENT_ID), { body: [] })
	// 	.then(() => console.log("Successfully deleted all application commands."))
	// 	.catch(console.error);

	// Register application commands for main guild
	await rest.put(Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID), {
		body: [...slashCommands, ...contextCommands].map((command) =>
			command.data.toJSON()
		),
	});
}
