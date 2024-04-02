import { SlashCommandBuilder, ChannelType } from "discord.js";
import { SlashCommand } from "../index.js";
import { ROLE_VCPING } from "../../lib/loadDiscordObjects.js";

let vcPingCooldown: boolean = false;

export default {
	data: new SlashCommandBuilder()
		.setName("vcping")
		.setDescription("Notifies people that a vc is happening.")
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("Channel where the VC is happening.")
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildVoice)
		),

	async execute(interaction) {
		const channel = interaction.options.getChannel("channel", true, [
			ChannelType.GuildVoice,
		]);
		const connected = channel.members.toJSON().length;

		if (vcPingCooldown) {
			await interaction.reply(
				`<:no:1050760960668868670> This command is on a cooldown. The bot will only ping once every 6 hours.`
			);
			return;
		}

		if (connected < 3) {
			await interaction.reply(
				`<:no:1050760960668868670> There are ${connected} users connected to ${channel}. There must be at least 3 for a VC ping to be sent.`
			);
			return;
		}

		vcPingCooldown = true;
		setTimeout(() => {
			vcPingCooldown = false;
		}, 1000 * 60 * 60 * 6);

		await interaction.reply(
			`<:call:1050760154418782288> ${ROLE_VCPING}, there are ${connected} users connected to ${channel}!`
		);
	},
} satisfies SlashCommand;
