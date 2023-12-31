import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import humanizeDuration from "humanize-duration";

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
					name: "<:djs:1049834255498354689> discord.js",
					value:
						"Built with the [discord.js](https://discord.js.org/) library.",
				},
				{
					name: "<:shine:1049289235548614697> Icons",
					value:
						"The icons used by this bot are provided by [iconsdiscord](https://discord.com/invite/aPvvhefmt3).",
				},
				{
					name: "<:developer:1049293038729576468> Developer",
					value: "tgobot was built by <@247070105916276736>.",
				},
				{ name: "Uptime", value: humanizeDuration(interaction.client.uptime) }
			);
		await interaction.reply({ embeds: [embed] });
	},
};
