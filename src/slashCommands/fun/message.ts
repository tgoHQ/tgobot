import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ChannelType,
	BaseGuildTextChannel,
	TextChannel,
} from "discord.js";
import { SlashCommand } from "..";

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
		const channel = interaction.options.getChannel("channel", true, [
			ChannelType.GuildAnnouncement,
			ChannelType.GuildText,
		]);

		const value = interaction.options.getString("value");
		if (!value) return;

		await channel.send(value).then((message) => {
			interaction.reply({ content: message.url, ephemeral: true });
		});
	},
} satisfies SlashCommand;
