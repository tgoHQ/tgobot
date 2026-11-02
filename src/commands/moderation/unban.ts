import { Command } from "@sapphire/framework";
import { PermissionFlagsBits } from "discord.js";
import { unban } from "#lib/moderation/actions/users/unban";

export class UnbanCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("unban")
				.setDescription("Unbans a user.")
				.addUserOption((option) =>
					option
						.setName("user")
						.setDescription("The user to unban")
						.setRequired(true),
				)
				.addStringOption((option) =>
					option.setName("reason").setDescription("Reason for the unban"),
				)
				.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		interaction.reply(
			await unban({
				targetUser: interaction.options.getUser("user", true),
				reason: interaction.options.getString("reason") ?? undefined,
				author: interaction.user,
			}),
		);
	}
}
