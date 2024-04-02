import env from "./env.js";
import { Client, GatewayIntentBits } from "discord.js";
import { Collection } from "discord.js";
import { SlashCommand } from "../slashCommands/index.js";

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
		repliedUser: true,
	},
});

await client.login(env.TOKEN);

interface ExtendedClient extends Client {
	commands?: Collection<string, SlashCommand>;
}

export default client as ExtendedClient;
