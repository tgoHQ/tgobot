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
				.setName("value")
				.setDescription("The message to be sent. Plain text or JSON.")
				.setRequired(true)
		)
		.addBooleanOption((option) =>
			option
				.setName("rich")
				.setDescription(
					"Pass true to interpret message as JSON. If false, the message will be interpreted as plain text."
				)
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

	async execute(interaction) {
		const channel = interaction.options.getChannel("channel");
		const value = interaction.options.getString("value");
		const rich = interaction.options.getBoolean("rich");
		let messageJSON;

		if (rich) {
			try {
				messageJSON = JSON.parse(rich);
			} catch {
				return interaction.reply(
					"The JSON you provided is improperly formatted."
				);
			}
		}

		await channel.send(messageJSON || value).then(() => {
			interaction.reply("sent");
		});
	},
};
