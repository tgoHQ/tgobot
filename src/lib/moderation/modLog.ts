import { CHANNEL_MODLOG } from "../discord/loadDiscordObjects.js";
import { User, EmbedBuilder } from "discord.js";
import { colors } from "../util/constants";

export async function modUserLogEmbed(
	targetUser: User,
	string: string,
	author: User,
	reason?: string,
) {
	const embed = new EmbedBuilder()
		.setColor(colors.staffGreen.hex)
		.setDescription(string)
		.setAuthor({
			name: author.displayName,
			iconURL: author.displayAvatarURL(),
		})
		.addFields({ name: "Reason", value: reason ?? "No reason provided." })
		.setThumbnail(targetUser.displayAvatarURL())
		.setFooter({
			text: `${targetUser.displayName} - ${targetUser.username} - ${targetUser.id}`,
		});

	return modLogPost(embed);
}
export async function modToolLogEmbed(
	string: string,
	author: User,
	reason?: string,
) {
	const embed = new EmbedBuilder()
		.setColor(colors.staffGreen.hex)
		.setDescription(string)
		.setAuthor({
			name: author.displayName,
			iconURL: author.displayAvatarURL(),
		})
		.addFields({ name: "Reason", value: reason ?? "No reason provided." });
	return modLogPost(embed);
}

async function modLogPost(embed: EmbedBuilder) {
	return await (await CHANNEL_MODLOG()).send({ embeds: [embed] });
}
