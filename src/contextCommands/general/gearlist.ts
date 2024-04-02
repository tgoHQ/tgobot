import { ApplicationCommandType, ContextMenuCommandBuilder } from "discord.js";
import { UserContextCommand } from "..";

export default {
	data: new ContextMenuCommandBuilder()
		.setName("View gear lists")
		.setType(ApplicationCommandType.User),
	async execute(interaction) {
		const user = interaction.targetUser;

		await interaction.deferReply({ ephemeral: true });

		interaction.editReply({
			content: `gear lists for ${user.displayName}`,
		});
	},
} satisfies UserContextCommand;
