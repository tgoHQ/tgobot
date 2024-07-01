import { Command } from "@sapphire/framework";

import { EmbedBuilder } from "discord.js";
import humanizeDuration from "humanize-duration";
import { Emoji } from "../../lib/util/emoji.js";

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
		interaction: Command.ChatInputCommandInteraction
	) {
		const embed = new EmbedBuilder()
			.setColor("#137c5a")
			.setTitle("tgobot")
			.addFields(
				{
					name: `${Emoji.DiscordJS} discord.js`,
					value:
						"Built with the [discord.js](https://discord.js.org/) library.",
				},
				{
					name: `${Emoji.IconsDiscord} Icons`,
					value:
						"The icons used by this bot are provided by [iconsdiscord](https://discord.com/invite/aPvvhefmt3).",
				},
				{
					name: `${Emoji.Developer} Developer`,
					value: "`tgobot` was built by <@247070105916276736>.",
				},
				{ name: "Uptime", value: humanizeDuration(interaction.client.uptime) }
			);
		await interaction.reply({ embeds: [embed] });
	}
}
