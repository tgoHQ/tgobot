import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import env from "./lib/util/env.js";

const client = new SapphireClient({
	intents: [
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
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
	loadMessageCommandListeners: true,
});

await client.login(env.TOKEN);
