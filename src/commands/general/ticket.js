import { SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("ticket")
		.setDescription("Open a new ticket with the server staff.")
		.addStringOption((option) =>
			option
				.setName("topic")
				.setDescription("The title of the ticket.")
				.setRequired(true)
		),

	async execute(interaction) {
		const topic = interaction.options.getString("topic");
		const author = interaction.user;

		const ticketChannel = interaction.client.channels.cache.get(
			process.env.TICKET_CHANNEL_ID
		);

		console.log(typeof ticketChannel);
	},
};
