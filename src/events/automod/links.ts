import env from "../../lib/env.js";
import { Events, EmbedBuilder, BaseGuildTextChannel } from "discord.js";
import type { Event } from "../index.js";

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
				return role.id === env.ROLE_INTRODUCED_ID;
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
		const responseMessage = `${member.user} You may not send links until you've been a member for 2 hours or introduced yourself in <#${env.CHANNEL_INTRODUCTIONS_ID}>!`;
		try {
			await member.user.send(responseMessage);
		} catch (e) {
			await message.channel.send(responseMessage);
		}

		//delete the message with the link
		message.delete();

		//fetch the alerts channel
		const alertChannel = await message.guild.channels.fetch(
			env.CHANNEL_ALERT_ID
		);
		if (!(alertChannel instanceof BaseGuildTextChannel)) {
			throw new Error(
				"Log channel is not a valid text channel. Check your env variable LOG_CHANNEL_ID."
			);
		} //todo

		const embed = new EmbedBuilder()
			.setTitle("Blocked a link from a new user")
			.setColor("#137c5a")
			.addFields(
				{ name: "User", value: member.user.toString() },
				{ name: "Message Content", value: message.content },
				{ name: "Channel", value: message.channel.toString() }
			);

		alertChannel.send({ embeds: [embed] });
	},
} satisfies Event<Events.MessageCreate>;
