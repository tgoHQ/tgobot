import fs from "node:fs";
import path from "node:path";
import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
	],
	presence: {
		activities: [
			{
				name: "outside",
			},
		],
	},
	allowedMentions: {
		parse: ["roles", "users"],
	},
});

import commands from "./commands/index.js";

import registerSlashCommands from "./commands/register.js";
await registerSlashCommands(commands);

import useSlashCommands from "./commands/use.js";
await useSlashCommands(client, commands);

//load events
const eventsPath = path.resolve("src/events");
const eventFiles = fs
	.readdirSync(eventsPath)
	.filter((file) => file.endsWith(".mjs"));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = (await import(filePath)).default;
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}
console.log(`Client listening for ${eventFiles.length} events.`);

client.login(process.env.TOKEN);
