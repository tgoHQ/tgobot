import { colors } from "../../../../util/constants.js";
import { CHANNEL_MODLOG } from "../../../loadDiscordObjects.js";
import { UserNote } from "../../userNotes.js";
import { type User, EmbedBuilder } from "discord.js";
import { removeTabs } from "../../../../util/removeTabs.js";

type UserModActionHandlerOpts = {
	/** the user who is being actioned */
	targetUser: User;
	/** the user who created the warning */
	author: User;
	/** the string of what the action is */
	string: string;
	/** the reason/content of the action */
	reason?: string;
};

/** to be run in every user mod action module. handles the common logic of DMs and logging */
export async function handleUserModAction(opts: UserModActionHandlerOpts) {
	await dmTargetUser(opts);
	await logToUserNotes(opts);
	await postToModlog(opts);
}

async function dmTargetUser({
	targetUser,
	string,
	author,
	reason,
}: UserModActionHandlerOpts) {
	try {
		await targetUser.send({
			content: removeTabs(`
				You have recieved a moderation action on The Great Outdoors.
				### Action
				${string}
				### Reason
				${reason ?? "No reason provided."}
				### Author
				${author}

				You can review our [moderation policies](https://docs.google.com/document/d/1q-EzLayHiIS-cDfmuWoJwnuKGfVc7d2sjX7_LEIuTMA/) or [submit an appeal](https://forms.gle/4jWKXXXjWPhp9GbW6).
			`),
		});
	} catch {}
}

async function logToUserNotes({
	targetUser,
	string,
	reason,
	author,
}: UserModActionHandlerOpts) {
	UserNote.create({
		author,
		content: `${string}\n${reason ?? "No reason provided."}`,
		targetUser,
	});
}

async function postToModlog({
	targetUser,
	string,
	author,
	reason,
}: {
	targetUser: User;
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
		.addFields({ name: "Reason", value: reason ?? "No reason provided." })
		.setThumbnail(targetUser.displayAvatarURL())
		.setFooter({
			text: `${targetUser.displayName} - ${targetUser.username} - ${targetUser.id}`,
		});

	return postEmbed(embed);
}

async function postEmbed(embed: EmbedBuilder) {
	return await (await CHANNEL_MODLOG()).send({ embeds: [embed] });
}
