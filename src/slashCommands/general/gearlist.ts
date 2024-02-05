import { SlashCommandBuilder, EmbedBuilder, User } from "discord.js";
import { Command } from "..";

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
		const targetUser = interaction.options.getUser("user");

		//look up all saved gear lists for user
		//format into set of embed fields and add to embed

		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor("#137c5a")
					.setTitle(`${targetUser.displayName}'s Gear Lists`)
					.setThumbnail(targetUser.displayAvatarURL()),
			],
		});
	},
};
