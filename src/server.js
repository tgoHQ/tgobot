import { Client, GatewayIntentBits, TextChannel } from "discord.js";

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
		parse: ["users"],
	},
});

import commands from "./commands/index.js";

import registerSlashCommands from "./modules/registerSlashCommands.js";
await registerSlashCommands(commands);

import useSlashCommands from "./modules/useSlashCommands.js";
await useSlashCommands(client, commands);

// //load events
import loadEvents from "./events/index.js";
loadEvents(client);

client.login(process.env.TOKEN);
