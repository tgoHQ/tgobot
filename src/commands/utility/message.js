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
				.setDescription("The message to be sent. Plain text or JSON.")
				.setRequired(true)
		)
		.addBooleanOption((option) =>
			option
				.setName("embed")
				.setDescription("Pass true to interpret message as JSON for an embed.")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

	async execute(interaction) {
		const channel = interaction.options.getChannel("channel");
		const value = interaction.options.getString("value");
		const isEmbed = interaction.options.getBoolean("embed");
		let embedValue;

		if (isEmbed) {
			try {
				embedValue = new EmbedBuilder(value);
			} catch {
				return interaction.reply(
					"The JSON you provided is improperly formatted."
				);
			}
		}

		await channel.send(embedValue || value).then(() => {
			interaction.reply("sent");
		});
	},
};
