import { ApplicationCommandType, ContextMenuCommandBuilder } from "discord.js";
import { UserContextCommand } from "..";
import gearlistEmbed from "../../lib/util/gearlistEmbed.js";

export default {
	data: new ContextMenuCommandBuilder()
		.setName("View gear lists")
		.setType(ApplicationCommandType.User),
	async execute(interaction) {
		interaction.reply({
			embeds: [await gearlistEmbed(interaction.targetUser)],
		});
	},
} satisfies UserContextCommand;
