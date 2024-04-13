import { EmbedBuilder, User } from "discord.js";
import { CHANNEL_MODLOG } from "../discord/loadDiscordObjects.js";

export default async function ({
	targetUser,
	author,
	string,
	reason,
}: {
	targetUser: User;
	author: User;
	string: string;
	reason?: string;
}) {
	const embed = new EmbedBuilder()
		.setColor("#137c5a")
		.setDescription(string)
		.setAuthor({
			name: author.username,
			iconURL: author.displayAvatarURL(),
		})
		.addFields({ name: "Reason", value: reason ?? "No reason provided." })
		.setThumbnail(targetUser.displayAvatarURL());

	return await (await CHANNEL_MODLOG.send({ embeds: [embed] })).crosspost();
}
