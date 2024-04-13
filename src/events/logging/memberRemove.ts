import { Events, EmbedBuilder } from "discord.js";
import type { Event } from "../index.js";

import { CHANNEL_LOG } from "../../lib/discord/loadDiscordObjects.js";

export default {
	name: Events.GuildMemberRemove,
	async execute(member) {
		const embed = new EmbedBuilder()
			.setColor("#000000")
			.setTitle("User Left")
			.setThumbnail(member.user.displayAvatarURL())
			.setDescription(member.user.toString())
			.addFields({ name: "Username", value: member.user.username });
		CHANNEL_LOG.send({ embeds: [embed] });
	},
} satisfies Event<Events.GuildMemberRemove>;
