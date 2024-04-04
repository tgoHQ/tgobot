import { SlashCommandBuilder, ChannelType } from "discord.js";
import { SlashCommand } from "../index.js";
import { ROLE_VCPING } from "../../lib/loadDiscordObjects.js";
import { Emoji } from "../../lib/emoji.js";
import humanizeDuration from "humanize-duration";

const MIN_CONNECTED_USERS = 3;
const COOLDOWN = 6 * 60 * 60 * 1000;

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
				`${
					Emoji.False
				} This command is on a cooldown. The bot will only ping once every ${humanizeDuration(
					COOLDOWN
				)}.`
			);
			return;
		}

		if (connected < MIN_CONNECTED_USERS) {
			await interaction.reply(
				`${Emoji.False} There are ${connected} people in ${channel}. There must be at least ${MIN_CONNECTED_USERS} to send a VC ping.`
			);
			return;
		}

		vcPingCooldown = true;
		setTimeout(() => {
			vcPingCooldown = false;
		}, 1000 * 60 * 60 * 6);

		await interaction.reply(
			`${Emoji.Call} ${ROLE_VCPING}, there are ${connected} people in ${channel}!`
		);
	},
} satisfies SlashCommand;
