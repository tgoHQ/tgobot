import { User, EmbedBuilder } from "discord.js";
import { CHANNEL_MODLOG } from "../discord/loadDiscordObjects.js";

export default async function ({
	string,
	author,
	reason,
}: {
	string: string;
	author: User;
	reason?: string;
}) {
	const embed = new EmbedBuilder()
		.setColor("#137c5a")
		.setDescription(string)
		.setAuthor({
			name: author.username,
			iconURL: author.displayAvatarURL(),
		})
		.addFields({ name: "Reason", value: reason ?? "No reason provided." });

	return await (await CHANNEL_MODLOG.send({ embeds: [embed] })).crosspost();
}
