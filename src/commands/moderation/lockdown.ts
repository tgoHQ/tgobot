import { Command } from "@sapphire/framework";

import { PermissionFlagsBits } from "discord.js";
import getDuration from "../../lib/util/getDuration.js";
import parseDuration from "parse-duration";
import humanizeDuration from "humanize-duration";

export class LockdownCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("lockdown")
				.setDescription("Lock down the server in the event of a raid")
				.addBooleanOption((option) =>
					option
						.setName("dms")
						.setDescription("Whether to disable DMs between users")
						.setRequired(true)
				)
				.addBooleanOption((option) =>
					option
						.setName("invites")
						.setDescription("Whether to disable the server's invite links")
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("duration")
						.setDescription(
							"Duration of the lockdown. Accepts units and abbreviations."
						)
						.setRequired(true)
				)
				.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	) {
		const pauseDms = interaction.options.getBoolean("dms", true);
		const pauseInvites = interaction.options.getBoolean("invites", true);

		const duration =
			parseDuration(interaction.options.getString("duration", true)) ??
			getDuration.hours(2);
		const timeout = new Date(Date.now() + duration);

		interaction.client.rest.put(
			`/guilds/${interaction.guild?.id}/incident-actions`,
			{
				body: {
					dms_disabled_until: pauseDms ? timeout : null,
					invites_disabled_until: pauseInvites ? timeout : null,
				},
			}
		);

		interaction.reply(
			`DMs are ${
				pauseDms ? "disabled for " + humanizeDuration(duration) : "enabled"
			}. Invites are ${
				pauseInvites ? "disabled for " + humanizeDuration(duration) : "enabled"
			}.`
		);
	}
}

//todo send this to modlog and make the command response fancier
//todo also add an option to disable send messages permission for everyone but staff or verified+?
