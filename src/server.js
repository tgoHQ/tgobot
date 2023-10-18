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
console.log(`Pulled ${commands.length} commands from index!`);

import registerSlashCommands from "./modules/registerSlashCommands.js";
await registerSlashCommands(commands);

import useSlashCommands from "./modules/useSlashCommands.js";
await useSlashCommands(client, commands);

// //load events
import events from "./events/index.js";
events.load(client);

client.login(process.env.TOKEN);
