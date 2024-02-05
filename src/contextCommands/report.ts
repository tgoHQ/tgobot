import { ContextMenuCommandBuilder, ApplicationCommandType } from "discord.js";

export default {
	data: new ContextMenuCommandBuilder()
		.setName("Report")
		.setType(ApplicationCommandType.User),

	async execute(interaction) {
		const message = interaction.targetMessage;

		console.log(message.content);
	},
};
