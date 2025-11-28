import { Listener } from "@sapphire/framework";

import {
	ContainerBuilder,
	GuildMember,
	TextDisplayBuilder,
	MessageFlags,
	SectionBuilder,
	ThumbnailBuilder,
} from "discord.js";
import {
	CHANNEL_LOG,
	ROLE_LEAVING_ALERT_ID,
	CHANNEL_ALERT,
} from "../../lib/loadDiscordObjects.js";
import { removeTabs } from "../../util/removeTabs.js";
import { colors } from "../../util/constants.js";

export class GuildMemberRemoveListener extends Listener {
	public async run(member: GuildMember) {
		const components = [
			new ContainerBuilder()
				.setAccentColor(colors.staffGreen.decimal)

				.addSectionComponents(
					new SectionBuilder()
						.setThumbnailAccessory(
							new ThumbnailBuilder().setURL(member.user.displayAvatarURL()),
						)
						.addTextDisplayComponents(
							new TextDisplayBuilder().setContent(
								removeTabs(
									`
										## User Left
										${member.user}
										${member.user.username}
										${member.user.id}
										Roles
										${member.roles.cache.map((role) => role.toString()).join(", ")}
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

		const leavingRole = await ROLE_LEAVING_ALERT_ID();

		if (member.roles.cache.has(leavingRole.id)) {
			(await CHANNEL_ALERT()).send({
				components,
				flags: MessageFlags.IsComponentsV2,
			});
		}
	}
}
