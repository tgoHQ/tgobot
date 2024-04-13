import { SlashCommandBuilder, ChannelType } from "discord.js";
import { SlashCommand } from "../index.js";
import { ROLE_VCPING } from "../../../lib/discord/loadDiscordObjects.js";
import { Emoji } from "../../../lib/util/emoji.js";
import humanizeDuration from "humanize-duration";
import duration from "../../../lib/util/getDuration.js";

const MIN_CONNECTED_USERS = 3;
const COOLDOWN = duration.hours(6);

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
		}, COOLDOWN);

		await interaction.reply(
			`${Emoji.Call} ${ROLE_VCPING}, there are ${connected} people in ${channel}!`
		);
	},
} satisfies SlashCommand;
