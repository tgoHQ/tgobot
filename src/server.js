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
		parse: ["users"],
	},
});

import registerSlashCommands from "./modules/registerSlashCommands.js";
await registerSlashCommands();

import useSlashCommands from "./modules/useSlashCommands.js";
await useSlashCommands(client);

import loadEvents from "./events/index.js";
loadEvents(client);

client.login(process.env.TOKEN);
