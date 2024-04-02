import { EmbedBuilder, User } from "discord.js";
import { CHANNEL_MODLOG } from "../../loadDiscordObjects.js";

export default async function userModerationLog({
	user,
	author,
	string,
	reason,
}: {
	user: User;
	author: User;
	string: string;
	reason: string;
}) {
	//create embed
	const embed = new EmbedBuilder()
		.setColor("#137c5a")
		.setDescription(string)
		.setAuthor({
			name: author.username,
			iconURL: author.displayAvatarURL(),
		})
		.setThumbnail(user.displayAvatarURL())
		.addFields({ name: "Reason", value: reason });

	//post to modlog channel and return message
	return await (await CHANNEL_MODLOG.send({ embeds: [embed] })).crosspost();
}
