import { Command } from "@sapphire/framework";

import {
	MessageFlags,
	ContainerBuilder,
	TextDisplayBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
} from "discord.js";
import { Emoji } from "../../util/emoji.js";
import { removeTabs } from "../../util/removeTabs.js";
import { colors } from "../../util/constants.js";

export class HelpCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder.setName("help").setDescription("List commands you can use");
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		const container = new ContainerBuilder()
			.setAccentColor(colors.staffGreen.decimal)
			.addTextDisplayComponents(
				new TextDisplayBuilder().setContent(
					`# ${Emoji.SlashCommand} TGO Command Help`,
				),
			)
			.addSeparatorComponents(
				new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large),
			)
			.addTextDisplayComponents(
				new TextDisplayBuilder().setContent(
					removeTabs(
						`
							</snippet:1205576907517599815> Pull up commonly used links or the answer to an FAQ.

							<id:customize>: See the available roles and choose yours.

							</rank:1010973721076432957>: Check your current level and rank in the server.
							</leaderboard:1010973726558388304>: See the full leaderboard of server ranks.
							</stats message:1025501230044286982>: See server statistics.

							</vcping:1164780041104793632>: Notify users with the vcping role that the VC channel is in use.

							</bump:947088344167366698>: Bump the server on Disboard.

							</tickets open:839848848003825673>: Open a ticket to talk to the server staff.

							</climb:1081349272986988555>: Display info about a climbing route from OpenBeta.
							</crag:1081476008538030140>: Display info about a crag from OpenBeta.
							</rockgrade:1408972696976363634>: Display info about a climbing grade and convert to other scales.
						`,
					),
				),
			);

		await interaction.reply({
			flags: MessageFlags.IsComponentsV2,
			components: [container],
		});
	}
}
