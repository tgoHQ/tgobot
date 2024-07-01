import { Command } from "@sapphire/framework";

import { PermissionFlagsBits } from "discord.js";
import parseDuration from "parse-duration";
import timeout from "../../lib/moderation/actions/users/timeout.js";
import getDuration from "../../lib/util/getDuration.js";

export class TimeoutCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("timeout")
				.setDescription("Timeouts a user.")
				.addUserOption((option) =>
					option
						.setName("user")
						.setDescription("The user to timeout")
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("duration")
						.setDescription(
							"Duration of the timeout. Accepts units and abbreviations."
						)
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("reason")
						.setDescription("Reason for the timeout")
						.setRequired(true)
				)
				.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	) {
		//todo if user is not a member of the server

		const durationRaw = interaction.options.getString("duration", true);
		const duration = parseDuration(durationRaw) ?? getDuration.hours(1); //default 1 hour if input cannot be parsed

		interaction.reply(
			await timeout({
				targetUser: interaction.options.getUser("user", true),
				reason: interaction.options.getString("reason", true),
				author: interaction.user,
				duration: duration,
			})
		);
	}
}
