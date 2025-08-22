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

	const userFlags = member.user.flags?.toArray() ?? [];
	const memberFlags = member.flags.toArray();

	const flags = [...userFlags, ...memberFlags];

	const timeout = getMemberTimeoutDuration(member);

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
								${roles.map((r) => `<@&${r.id}>`).join(", ")}
								### Flags
								${flags.length ? flags.join(", ") : "None"}
							`.replaceAll("\t", ""),
					),
				)
				.setThumbnailAccessory(new ThumbnailBuilder().setURL(avatar)),
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
