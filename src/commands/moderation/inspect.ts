import { Command } from "@sapphire/framework";
import { MessageFlags, PermissionFlagsBits } from "discord.js";
import { userInspectComponent } from "../../lib/moderation/inspect.js";

export class InspectCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("inspect")
				.setDescription("Inspect the moderation properties of a user")
				.addUserOption((option) =>
					option
						.setName("user")
						.setDescription("User to inspect")
						.setRequired(true),
				)
				.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		if (!interaction.guild) return;

		const user = interaction.options.getUser("user", true);

		await interaction.reply({
			flags: MessageFlags.IsComponentsV2,
			components: [await userInspectComponent(user)],
			allowedMentions: {},
		});
	}
}
