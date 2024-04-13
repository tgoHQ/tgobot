import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "..";
import gearlistEmbed from "../../lib/util/gearlistEmbed.js";

export default {
	data: new SlashCommandBuilder()
		.setName("gearlist")
		.setDescription("Check a user's saved gear lists")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("The user to look up")
				.setRequired(true)
		),

	async execute(interaction) {
		interaction.reply({
			embeds: [await gearlistEmbed(interaction.options.getUser("user", true))],
		});
	},
} satisfies SlashCommand;
