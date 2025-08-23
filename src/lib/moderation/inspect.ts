import {
	GuildMember,
	User,
	ContainerBuilder,
	SectionBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
	TextDisplayBuilder,
	ThumbnailBuilder,
} from "discord.js";
import humanizeDuration from "humanize-duration";
import { Emoji } from "../../lib/util/emoji.js";
import { GUILD } from "../discord/loadDiscordObjects.js";
import { UserNote } from "./userNotes.js";

export async function userInspectComponent(user: User) {
	const guild = await GUILD();

	//todo make this work on users who are not in the server. show a note on users that are currently banned, next to where it shows timeout
	const member = await guild.members.fetch(user.id);

	const ageOnJoin = getMemberAcctAgeOnJoin(member);

	const avatar = user.displayAvatarURL({
		size: 4096,
	});
	const avatarEncoded = encodeURIComponent(avatar);
	const googleLensUrl = `https://lens.google.com/uploadbyurl?url=${avatarEncoded}&client=app`;
	const googleClassicUrl = `https://www.google.com/searchbyimage?client=app&image_url=${avatarEncoded}`;
	const tinEyeUrl = `https://tineye.com/search?url=${avatarEncoded}`;

	// remove last entry because it's always @everyone
	const roles = member.roles.cache.map((r) => r).slice(0, -1);
	const rolesSorted = roles.sort((a, b) => b.position - a.position);

	const userFlags = member.user.flags?.toArray() ?? [];
	const memberFlags = member.flags.toArray();

	const flags = [...userFlags, ...memberFlags];

	const timeout = getMemberTimeoutDuration(member);

	const notes = await UserNote.getByUser(user.id);
	const notesSorted = notes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
	const notesFormatted = notesSorted.map((n) =>
		`
			${n.content}
			-# <@${n.authorId}> on <t:${Math.round(n.createdAt.getTime() / 1000)}:f> · \`${n.id}\`
		`.replaceAll("\t", ""),
	);

	return new ContainerBuilder()
		.setAccentColor(member.displayColor)
		.addTextDisplayComponents(
			new TextDisplayBuilder().setContent(
				`
						# <@${user.id}>
						-# ${user.username} · ${user.id}
						${timeout ? `\n${Emoji.Timeout} **Timed out for** \`${humanizeDuration(timeout, { largest: 2, maxDecimalPoints: 0 })}\`**.**` : ""}

					`.replaceAll("\t", ""),
			),
		)
		.addSeparatorComponents(
			new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large),
		)
		.addSectionComponents(
			new SectionBuilder()
				.addTextDisplayComponents(
					new TextDisplayBuilder().setContent(
						`
								## Details

								**Age on Join:** \`${ageOnJoin ? humanizeDuration(ageOnJoin, { largest: 2 }) : "Unknown"}\`
								**Avatar:** [View](${avatar}), [Google Lens](${googleLensUrl}), [Google Search](${googleClassicUrl}), [TinEye](${tinEyeUrl})
								### Roles
								${rolesSorted.map((r) => `<@&${r.id}>`).join(", ")}
								### Flags
								${flags.length ? flags.join(", ") : "None"}
							`.replaceAll("\t", ""),
					),
				)
				.setThumbnailAccessory(new ThumbnailBuilder().setURL(avatar)),
		)
		.addSeparatorComponents(
			new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large),
		)
		.addTextDisplayComponents(
			new TextDisplayBuilder().setContent(
				`
				## Notes
				
				${notesFormatted.join("")}
				`.replaceAll("\t", ""),
			),
		);
}

function getMemberAcctAgeOnJoin(member: GuildMember) {
	const joinedAt = member.joinedTimestamp;
	const createdAt = member.user.createdTimestamp;

	if (!joinedAt) return null;

	return createdAt - joinedAt;
}

function getMemberTimeoutDuration(member: GuildMember) {
	if (!member.isCommunicationDisabled()) return null;

	return member.communicationDisabledUntilTimestamp - Date.now();
}
