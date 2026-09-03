import { Listener, Events } from "@sapphire/framework";
import {
	ContainerBuilder,
	GuildMember,
	MessageFlags,
	SectionBuilder,
	TextDisplayBuilder,
	ThumbnailBuilder,
} from "discord.js";
import { CHANNEL_ALERT } from "#lib/loadDiscordObjects";
import { getJoinAlertByUser } from "#lib/moderation/joinAlert";
import { colors } from "#util/colors";
import { removeTabs } from "#util/removeTabs";

export class JoinAlertCheckListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options,
	) {
		super(context, {
			...options,
			event: Events.GuildMemberAdd,
		});
	}

	public async run(member: GuildMember) {
		const joinAlert = await getJoinAlertByUser(member.id);
		if (!joinAlert) return;

		const component = new ContainerBuilder()
			.setAccentColor(colors.red.decimal)
			.addSectionComponents(
				new SectionBuilder()
					.setThumbnailAccessory(
						new ThumbnailBuilder().setURL(member.user.displayAvatarURL()),
					)
					.addTextDisplayComponents(
						new TextDisplayBuilder().setContent(
							removeTabs(
								`
									## Join Alert
									${member.user} has joined the server.
									-# Added by <@${joinAlert.authorId}> on <t:${Math.round(joinAlert.createdAt.getTime() / 1000)}:D>
									${joinAlert.reason ? `\n> ${joinAlert.reason}` : ""}
								`,
							),
						),
					),
			);

		(await CHANNEL_ALERT()).send({
			components: [component],
			flags: MessageFlags.IsComponentsV2,
		});
	}
}
