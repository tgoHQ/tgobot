import env from "../lib/util/env.js";
import { REST, Routes } from "discord.js";
import commands from "./index.js";

export default async function registerCommands() {
	// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(env.TOKEN);

	const commandData = commands.map((command) => command.data.toJSON());

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

	await rest.put(Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID), {
		body: commandData,
	});

	console.log(`Registered application commands.`);
}
