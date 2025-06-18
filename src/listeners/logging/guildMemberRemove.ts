import { Listener } from "@sapphire/framework";

import { EmbedBuilder, GuildMember } from "discord.js";
import { CHANNEL_LOG } from "../../lib/discord/loadDiscordObjects.js";

export class GuildMemberRemoveListener extends Listener {
	public async run(member: GuildMember) {
		const embed = new EmbedBuilder()
			.setColor("#000000")
			.setTitle("User Left")
			.setThumbnail(member.user.displayAvatarURL())
			.setDescription(member.user.toString())
			.addFields({ name: "Username", value: member.user.username });
		(await CHANNEL_LOG()).send({ embeds: [embed] });
	}
}
