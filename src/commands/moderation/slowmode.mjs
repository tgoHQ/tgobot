import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import ModLog from "../../modules/modlog/modlog.mjs";
import parseDuration from "parse-duration";

export default {
	data: new SlashCommandBuilder()
		.setName("slowmode")
		.setDescription("Sets slowmode on the current channel.")
		.addStringOption((option) =>
			option
				.setName("time")
				.setDescription(
					"Slowmode interval. Set to 0 seconds to disable slowmode."
				)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Reason for the slowmode")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	async execute(interaction) {
		const targetChannel = interaction.channel;
		const reason = interaction.options.getString("reason");
		const slowmodeIntervalRaw = interaction.options.getString("time");
		const slowmodeInterval = parseDuration(slowmodeIntervalRaw);
		const author = interaction.user;

		await targetChannel
			.setRateLimitPerUser(slowmodeInterval / 1000, reason)
			.then(() => {
				const modlog = new ModLog({
					type: "Slowmode",
					author,
					reason,
					slowmodeInterval,
					targetChannel,
				});

				modlog.post(interaction.client);
				interaction.reply(modlog.string);
			});
	},
};
