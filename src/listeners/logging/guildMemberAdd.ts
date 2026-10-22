import { Listener } from "@sapphire/framework";

import {
	ContainerBuilder,
	GuildMember,
	MessageFlags,
	SectionBuilder,
	TextDisplayBuilder,
	ThumbnailBuilder,
} from "discord.js";
import humanizeDuration from "humanize-duration";
import { CHANNEL_LOG } from "#lib/loadDiscordObjects";
import { colors } from "#util/colors";
import { removeTabs } from "#util/removeTabs";

export class GuildMemberAddListener extends Listener {
	public async run(member: GuildMember) {
		const accountAge = humanizeDuration(
			Date.now() - member.user.createdTimestamp,
			{
				largest: 2,
				units: ["y", "mo", "d", "h", "m", "s"],
			},
		);

		const component = new ContainerBuilder()
			.setAccentColor(colors.staffGreen.decimal)
			.addSectionComponents(
				new SectionBuilder()
					.setThumbnailAccessory(
						new ThumbnailBuilder().setURL(member.user.displayAvatarURL()),
					)
					.addTextDisplayComponents(
						new TextDisplayBuilder().setContent(
							removeTabs(`
								## User Joined
								${member.user}
								### Username
								${member.user.username}
								### Account Age
								${accountAge}
							`),
						),
					),
			);

		(await CHANNEL_LOG()).send({
			components: [component],
			flags: MessageFlags.IsComponentsV2,
			allowedMentions: {},
		});
	}
}
