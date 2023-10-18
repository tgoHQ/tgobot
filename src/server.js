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
import loadEvents from "./events/index.js";
loadEvents(client);

const temporaryLogChannel = message.guild.channels.cache.get(
	process.env.TEMPORARY_LOG_CHANNEL_ID
);
if (!(temporaryLogChannel instanceof TextChannel)) {
	throw new Error(
		"Temporary log channel is not a valid text channel. Check your env variable TEMPORARY_LOG_CHANNEL_ID."
	);
}
client.env.temporaryLogChannel = temporaryLogChannel;

client.login(process.env.TOKEN);
