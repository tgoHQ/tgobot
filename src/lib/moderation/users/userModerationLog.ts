import { EmbedBuilder, User } from "discord.js";
import postModLogChannel from "../moglogchannel.js";

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

	//post to modlog channel
	const message = await postModLogChannel(embed);
	await message.crosspost();
}
