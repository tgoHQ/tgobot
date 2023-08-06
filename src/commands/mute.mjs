import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import ModLog from "../modules/modlog.mjs";
import parseDuration from "parse-duration";

export default {
	data: new SlashCommandBuilder()
		.setName("mute")
		.setDescription("Mutes a user.")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("The user to mute")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("duration")
				.setDescription("Duration of the mute")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Reason for the mute")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

	async execute(interaction) {
		const member = interaction.options.getMember("user");
		const targetUser = member.user;
		const durationRaw = interaction.options.getString("duration");
		const duration = parseDuration(durationRaw);
		const reason = interaction.options.getString("reason");
		const author = interaction.user;

		await member.timeout(duration, reason).then(() => {
			const modlog = new ModLog({
				type: "Mute",
				author,
				reason,
				targetUser,
				duration,
			});
			modlog.post(interaction.client);
			interaction.reply(modlog.string);
		});
	},
};
