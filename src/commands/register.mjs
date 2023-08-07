import { REST, Routes } from "discord.js";

import fs from "node:fs";
import path from "node:path";

export default async function register() {
	const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
	const GUILD_ID = process.env.DISCORD_GUILD_ID;
	const TOKEN = process.env.DISCORD_BOT_TOKEN;

	const commands = [];
	// Grab all the command folders from the commands directory
	const foldersPath = path.resolve("src/commands");
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		if (!folder.endsWith(".mjs")) {
			// Grab all the command files from the commands directory
			const commandsPath = path.join(foldersPath, folder);
			const commandFiles = fs
				.readdirSync(commandsPath)
				.filter((file) => file.endsWith(".mjs"));

			// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
			for (const file of commandFiles) {
				const filePath = path.join(commandsPath, file);
				const command = import(filePath);
				console.log(command.data);
				if ("data" in command && "execute" in command) {
					commands.push(command.data.toJSON());
				} else {
					console.log(
						`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
					);
				}
			}
		}
	}

	// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(TOKEN);

	// and deploy your commands!
	(async () => {
		try {
			console.log(
				`Started registering ${commands.length} application (/) commands.`
			);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
				{ body: commands }
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
