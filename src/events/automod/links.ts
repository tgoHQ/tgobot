import env from "../../lib/env.js";
import {
	Events,
	EmbedBuilder,
	BaseGuildTextChannel,
	ActionRow,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	MessageActionRowComponentBuilder,
} from "discord.js";
import type { Event } from "../index.js";
import {
	CHANNEL_ALERT,
	CHANNEL_INTRODUCTIONS,
	ROLE_INTRODUCED,
} from "../../lib/loadDiscordObjects.js";

export default {
	name: Events.MessageCreate,

	async execute(message) {
		const linkRE = /https?:\/\/.{2,}/;

		//if message does not contain a link, ignore
		if (!linkRE.test(message.content)) {
			return;
		}

		if (message.guild?.id !== env.GUILD_ID) return; //if message not from main guild, return

		//fetch the GuildMember
		const member = await message.guild.members.fetch(message.author);

		//if member is a bot, ignore
		if (member.user.bot) return;

		//if member has Introduced role, ignore
		if (
			member.roles.cache.some((role) => {
				return role === ROLE_INTRODUCED;
			})
		) {
			return;
		}

		//if member joined more than 2 hours ago, ignore
		if (
			member.joinedTimestamp &&
			member.joinedTimestamp < Date.now() - 2 * 60 * 60 * 1000
		) {
			return;
		}

		//try to send DM to author, otherwise send a message in the channel
		const responseMessage = `${member.user} You may not send links until you've been a member for 2 hours or introduced yourself in ${CHANNEL_INTRODUCTIONS}!`;
		try {
			await member.user.send(responseMessage);
		} catch (e) {
			await message.channel.send(responseMessage);
		}

		//delete the message with the link
		message.delete();

		const embed = new EmbedBuilder()
			.setTitle("Blocked a link from a new user")
			.setColor("#137c5a")
			.addFields(
				{ name: "User", value: member.user.toString() },
				{ name: "Message Content", value: message.content },
				{ name: "Channel", value: message.channel.toString() }
			);

		const row =
			new ActionRowBuilder<MessageActionRowComponentBuilder>().setComponents(
				new ButtonBuilder()
					.setLabel("Red button")
					.setStyle(ButtonStyle.Danger)
					.setCustomId("ban")
			);

		CHANNEL_ALERT.send({ embeds: [embed], components: [row] });
	},
} satisfies Event<Events.MessageCreate>;
