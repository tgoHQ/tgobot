import {
	ChannelType,
	SlashCommandBuilder,
	TextChannel,
	EmbedBuilder,
} from "discord.js";

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

		if (!(ticketChannel instanceof TextChannel)) {
			console.log(
				"Ticket channel could not be found, or is not a text channel. Check the value of your TICKET_CHANNEL_ID env variable."
			);
			return;
		}

		ticketChannel.threads
			.create({
				name: topic,
				type: ChannelType.PrivateThread,
				invitable: false,
			})
			.then((thread) => {
				interaction.reply({
					content: `Created the thread ${thread}`,
					ephemeral: true,
				});

				const embed = new EmbedBuilder()
					.setTitle("New Ticket Opened")
					.setColor("137c5a")
					.setDescription(`${author} created a new ticket: ${thread}`);

				ticketChannel.send({ embeds: [embed] });

				const ticketEmbed = new EmbedBuilder()
					.setTitle("New Thread")
					.setDescription(
						`Welcome ${author}. Please describe your reason for opening this ticket. Include any relevant info such as screenshots, any third parties involved, etc.`
					);
				thread.send({ content: author.mention, embeds: [ticketEmbed] });
			});
	},
};
