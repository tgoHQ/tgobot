import { Command } from "@sapphire/framework";

import {
	ContainerBuilder,
	MessageFlags,
	TextDisplayBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
} from "discord.js";
import humanizeDuration from "humanize-duration";
import { Emoji } from "../../lib/util/emoji.js";
import { removeTabs } from "../../lib/util/removeTabs.js";
import { colors } from "../../lib/util/constants.js";

export class AboutCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("about")
				.setDescription("Displays information about this bot.");
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		const container = new ContainerBuilder()
			.setAccentColor(colors.staffGreen.decimal)
			.addTextDisplayComponents(
				new TextDisplayBuilder().setContent(
					`# \`tgobot\`\n-# Up for ${humanizeDuration(interaction.client.uptime, { largest: 1, maxDecimalPoints: 0 })}`,
				),
			)
			.addSeparatorComponents(
				new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large),
			)
			.addTextDisplayComponents(
				new TextDisplayBuilder().setContent(
					removeTabs(`
						### ${Emoji.Developer} Developer
						\`tgobot\` was built by <@247070105916276736>.
						### ${Emoji.Shine2} Open Source
						\`tgobot\` is AGPLv3! You can view and use the source code on [GitHub](https://github.com/tgoHQ/tgobot).
						### ${Emoji.IconsDiscord} Icons
						Some icons used by this bot are provided by [iconsdiscord](https://discord.com/invite/aPvvhefmt3).
					`),
				),
			);

		await interaction.reply({
			flags: MessageFlags.IsComponentsV2,
			components: [container],
			allowedMentions: {},
		});
	}
}
