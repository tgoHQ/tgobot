import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ChannelType,
} from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("message")
		.setDescription("Sends a message as the bot.")
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("Channel to send the message in.")
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildAnnouncement, ChannelType.GuildText)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

	async execute(interaction) {
		const channel = interaction.options.getChannel("channel");

		await channel.send("test").then(() => {
			interaction.reply("sent");
		});
	},
};
