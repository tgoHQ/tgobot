import { Listener } from "@sapphire/framework";

import { EmbedBuilder, GuildMember } from "discord.js";
import humanizeDuration from "humanize-duration";
import { CHANNEL_LOG } from "../../lib/discord/loadDiscordObjects.js";
import { colors } from "../../lib/util/constants";

export class MemberLeaveListener extends Listener {
	public async run(member: GuildMember) {
		const embed = new EmbedBuilder()
			.setColor(colors.staffGreen.hex)
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
				},
			);
		(await CHANNEL_LOG()).send({ embeds: [embed] });
	}
}
