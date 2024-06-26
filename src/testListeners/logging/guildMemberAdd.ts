import { Listener } from "@sapphire/framework";

import { EmbedBuilder, GuildMember } from "discord.js";
import humanizeDuration from "humanize-duration";
import { CHANNEL_LOG, ROLE_BOT } from "../../lib/discord/loadDiscordObjects.js";

export class GuildMemberRemoveListener extends Listener {
	public async run(member: GuildMember) {
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
	}
}
