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
		.addStringOption((option) =>
			option
				.setname("value")
				.setDescription("The message to be sent. Plain text or JSON.")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

	async execute(interaction) {
		const channel = interaction.options.getChannel("channel");
		const message = interaction.options.getString("value");

		await channel.send(message).then(() => {
			interaction.reply("sent");
		});
	},
};
