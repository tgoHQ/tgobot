import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import humanizeDuration from "humanize-duration";
import { SlashCommand } from "../index.js";
import { Emoji } from "../../../lib/util/emoji.js";

export default {
	data: new SlashCommandBuilder()
		.setName("about")
		.setDescription("Displays information about this bot."),

	async execute(interaction) {
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
					value: "tgobot was built by <@247070105916276736>.",
				},
				{ name: "Uptime", value: humanizeDuration(interaction.client.uptime) }
			);
		await interaction.reply({ embeds: [embed] });
	},
} satisfies SlashCommand;
