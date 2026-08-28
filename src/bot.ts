import {
	ApplicationCommandRegistries,
	RegisterBehavior,
	SapphireClient,
} from "@sapphire/framework";
import "@sapphire/plugin-hmr/register";

import { GatewayIntentBits, Partials } from "discord.js";

import { env } from "#env";
import { initializeCronJobs } from "#jobs/index";

//delete all existing commands and repopulate each time the bot starts
//https://sapphirejs.dev/docs/Guide/commands/application-commands/application-command-registry/advanced/setting-global-behavior-when-not-identical
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(
	RegisterBehavior.BulkOverwrite,
);

//only register commands in the home guild
//https://sapphirejs.dev/docs/Guide/commands/application-commands/application-command-registry/globally-configuring-guildids
ApplicationCommandRegistries.setDefaultGuildIds([env.GUILD_ID]);

const client = new SapphireClient({
	intents: [
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
	],
	// reactions on messages from before the current session arrive partial;
	// without these the reaction events never fire for them at all
	partials: [Partials.Message, Partials.Reaction, Partials.User],
	// initial presence is set from the ready listener and rotated daily by the rotatePresence cron job
	allowedMentions: {
		parse: ["users"],
		repliedUser: true,
	},
	hmr: {
		enabled: process.env["NODE_ENV"] !== "production",
	},
});

await client.login(env.TOKEN);

initializeCronJobs();
