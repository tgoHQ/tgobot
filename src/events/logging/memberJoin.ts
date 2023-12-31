import env from "../../util/env.js";
import { Events, EmbedBuilder, BaseGuildTextChannel } from "discord.js";
import type { Event } from "../index.js";

import humanizeDuration from "humanize-duration";

export default {
	name: Events.GuildMemberAdd,
	async execute(member) {
		//add bot role if new member is a bot
		if (member.user.bot === true) {
			await member.guild.members.addRole({
				user: member.user,
				role: env.ROLE_BOT_ID,
			});
		}

		//log the join
		const logChannel = member.guild.channels.cache.get(env.CHANNEL_LOG_ID);
		if (!(logChannel instanceof BaseGuildTextChannel)) {
			throw new Error(
				"Log channel is not a valid text channel. Check your env variable LOG_CHANNEL_ID."
			);
		} //todo

		const embed = new EmbedBuilder()
			.setColor("#137c5a")
			.setTitle("User Joined")
			.setThumbnail(member.user.displayAvatarURL())
			.setDescription(member.user.toString())
			.addFields(
				{ name: "Username", value: member.user.tag },
				{
					name: "Account Age",
					value: humanizeDuration(Date.now() - member.user.createdTimestamp, {
						largest: 2,
						units: ["y", "mo", "d", "h", "m", "s"],
					}),
				}
			);
		logChannel.send({ embeds: [embed] });
	},
} satisfies Event<Events.GuildMemberAdd>;
