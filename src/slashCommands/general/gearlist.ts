import { SlashCommandBuilder, EmbedBuilder, User } from "discord.js";

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

		//todo look up gear lists from database and make this command work

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
