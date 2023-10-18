import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import humanizeDuration from "humanize-duration";

export default {
	data: new SlashCommandBuilder()
		.setName("about")
		.setDescription("Displays information about this bot."),

	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor("#137c5a")
			.setTitle("tgobot3")
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
					name: "<:github:1049292058583638038> Open Source",
					value:
						"This bot is open source and its code is freely available on [Github](https://github.com/kevin8181/tgobot3) under the AGPL-3.0 license.",
				},
				{
					name: "<:developer:1049293038729576468> Developer",
					value: "tgobot3 was built by <@247070105916276736>.",
				},
				{ name: "Uptime", value: humanizeDuration(interaction.client.uptime) }
			);
		await interaction.reply({ embeds: [embed] });
	},
};
