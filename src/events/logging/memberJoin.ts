import env from "../../lib/env.js";
import { Events, EmbedBuilder, BaseGuildTextChannel } from "discord.js";
import type { Event } from "../index.js";

import humanizeDuration from "humanize-duration";
import { CHANNEL_LOG, ROLE_BOT } from "../../lib/loadDiscordObjects.js";

export default {
	name: Events.GuildMemberAdd,
	async execute(member) {
		//add bot role if new member is a bot
		if (member.user.bot === true) {
			await member.guild.members.addRole({
				user: member.user,
				role: ROLE_BOT,
			});
		}

		const embed = new EmbedBuilder()
			.setColor("#137c5a")
			.setTitle("User Joined")
			.setThumbnail(member.user.displayAvatarURL())
			.setDescription(member.user.toString())
			.addFields(
				{ name: "Username", value: member.user.username },
				{
					name: "Account Age",
					value: humanizeDuration(Date.now() - member.user.createdTimestamp, {
						largest: 2,
						units: ["y", "mo", "d", "h", "m", "s"],
					}),
				}
			);
		CHANNEL_LOG.send({ embeds: [embed] });
	},
} satisfies Event<Events.GuildMemberAdd>;
