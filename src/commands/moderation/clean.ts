import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import bulkDelete from "../../modules/moderation/actions/bulkDelete.js";

export default {
	data: new SlashCommandBuilder()
		.setName("clean")
		.setDescription("Deletes messages in bulk")
		.addIntegerOption((option) =>
			option
				.setName("number")
				.setDescription(
					"The number of recent messages to delete in this channel. Maximum of 100."
				)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Reason for the clean")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	async execute(interaction) {
		interaction.reply(
			await bulkDelete({
				channel: interaction.channel,
				reason: interaction.options.getString("reason"),
				author: interaction.user,
				number: interaction.options.getInteger("number"),
			})
		);
	},
};
