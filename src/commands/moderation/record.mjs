import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import graphql from "../../modules/database.mjs";

export default {
	data: new SlashCommandBuilder()
		.setName("record")
		.setDescription("Get a user's moderation record.")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("The user to check")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	async execute(interaction) {
		const user = interaction.options.getUser("user");

		const query = `
		query userRecord($_eq: String) {
			modlog(where: {target_user: {_eq: $_eq}}) {
			  id
			  author
			  bulk_delete_number
			  duration
			  modlog_message
			  reason
			  slowmode_interval
			  target_channel
			  target_user
			  type
			}
		  }
		`;
		const variables = {
			_eq: user.id,
		};
		const modlogs = graphql(query, variables);

		interaction.reply(modlogs);
	},
};
