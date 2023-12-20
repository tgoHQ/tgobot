import config from "../../config.js";
import { Events, EmbedBuilder } from "discord.js";
import humanizeDuration from "humanize-duration";

export default {
	name: Events.GuildMemberAdd,
	async execute(client, member) {
		if (member.user.bot === true) {
			await member.guild.members.addRole({
				user: member.user,
				role: config.ROLE_BOT_ID,
			});
		}

		const logChannel = member.guild.channels.cache.get(config.CHANNEL_LOG_ID);

		const embed = new EmbedBuilder()
			.setColor("137c5a")
			.setTitle("User Joined")
			.setThumbnail(member.user.displayAvatarURL())
			.setDescription(member.user.toString())
			.addFields(
				{ name: "Username", value: member.user.tag },
				{
					name: "Account Age",
					value: humanizeDuration(new Date() - member.user.createdAt, {
						largest: 2,
						units: ["y", "mo", "d", "h", "m", "s"],
					}),
				}
			);

		logChannel.send({ embeds: [embed] });
	},
};
