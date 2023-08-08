import fs from "node:fs";
import path from "node:path";

async function getCommands() {
	const commands = [];

	const foldersPath = path.resolve("src/commands");
	const commandFolders = fs
		.readdirSync(foldersPath)
		.filter((file) => !file.endsWith(".js"));

	for (const folder of commandFolders) {
		// Grab all the command files from the commands directory
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => file.endsWith(".js"));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = (await import(filePath)).default;

			if (command?.data && typeof command?.execute === "function") {
				commands.push(command);
			} else {
				console.log(
					`[WARNING] The command at ${filePath} is missing a required "data" or "execute" export.`
				);
			}
		}
	}
	return commands;
}

export default await getCommands();
