import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ChannelType,
	EmbedBuilder,
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
		.addStringOption((option) =>
			option
				.setName("value")
				.setDescription("The message to be sent.")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

	async execute(interaction) {
		const channel = interaction.options.getChannel("channel");
		const value = interaction.options.getString("value");

		await channel.send(value).then(() => {
			interaction.reply({ content: "Sent!", ephemeral: true });
		});
	},
};