import env from "../../lib/env.js";
import {
	Events,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	MessageActionRowComponentBuilder,
} from "discord.js";
import type { Event } from "../index.js";

export default {
	name: Events.MessageCreate,

	async execute(message) {
		//if message not from main guild, return
		if (message.guild?.id !== env.GUILD_ID) return;

		//if message does not contain a link, ignore
		const linkRE = /https?:\/\/.{2,}/;
		if (!linkRE.test(message.content)) {
			return;
		}

		//fetch the GuildMember
		const member = await message.guild.members.fetch(message.author);

		//if member is a bot, ignore
		if (member.user.bot) return;

		//check if link is lighterpack
		const lighterpackRE = /\bhttps?:\/\/lighterpack.com\/r\/[a-zA-Z0-9]{6}\b/;
		if (!lighterpackRE.test(message.content)) {
			return;
		}

		//TODO if this link is already saved to a user, ignore

		const row =
			new ActionRowBuilder<MessageActionRowComponentBuilder>().setComponents(
				new ButtonBuilder()
					.setLabel("Save to profile")
					.setStyle(ButtonStyle.Primary)
					.setCustomId("save"),
				new ButtonBuilder()
					.setLabel("Ignore")
					.setStyle(ButtonStyle.Secondary)
					.setCustomId("ignore")
			);

		await message.reply({
			content: "Would you like to save this gear list to your profile?",
			components: [row],
		});
	},
} satisfies Event<Events.MessageCreate>;

//todo
