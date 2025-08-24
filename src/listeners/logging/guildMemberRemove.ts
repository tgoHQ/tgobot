import { Listener } from "@sapphire/framework";

import {
	ContainerBuilder,
	GuildMember,
	SeparatorBuilder,
	SeparatorSpacingSize,
	TextDisplayBuilder,
	MessageFlags,
	SectionBuilder,
	ThumbnailBuilder,
} from "discord.js";
import { CHANNEL_LOG } from "../../lib/discord/loadDiscordObjects.js";
import { removeTabs } from "../../lib/util/removeTabs.js";

export class GuildMemberRemoveListener extends Listener {
	public async run(member: GuildMember) {
		const components = [
			new ContainerBuilder()
				.setAccentColor(1277018)
				.addTextDisplayComponents(
					new TextDisplayBuilder().setContent(`# ${member.user} Left`),
				)
				.addSeparatorComponents(
					new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large),
				)
				.addSectionComponents(
					new SectionBuilder()
						.setThumbnailAccessory(
							new ThumbnailBuilder().setURL(member.user.displayAvatarURL()),
						)
						.addTextDisplayComponents(
							new TextDisplayBuilder().setContent(
								removeTabs(
									`
										${member.user.username}
										${member.user.id}
									`,
								),
							),
						),
				),
		];

		(await CHANNEL_LOG()).send({
			components,
			flags: MessageFlags.IsComponentsV2,
		});
	}
}
