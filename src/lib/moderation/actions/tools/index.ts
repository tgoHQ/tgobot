import { CHANNEL_MODLOG } from "../../../loadDiscordObjects.js";
import { User, EmbedBuilder } from "discord.js";
import { colors } from "../../../../util/constants.js";

export async function handleToolModAction({
	string,
	author,
	reason,
}: {
	string: string;
	author: User;
	reason?: string;
}) {
	const embed = new EmbedBuilder()
		.setColor(colors.staffGreen.hex)
		.setDescription(string)
		.setAuthor({
			name: author.displayName,
			iconURL: author.displayAvatarURL(),
		})
		.addFields({ name: "Reason", value: reason ?? "No reason provided." });
	return postEmbed(embed);
}

async function postEmbed(embed: EmbedBuilder) {
	return await (await CHANNEL_MODLOG()).send({ embeds: [embed] });
}
