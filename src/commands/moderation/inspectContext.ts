import { Command } from "@sapphire/framework";

import {
	ApplicationCommandType,
	PermissionFlagsBits,
	MessageFlags,
} from "discord.js";
import { userInspectComponent } from "../../lib/moderation/inspect.js";

export class UserInspectContextCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerContextMenuCommand((builder) => {
			builder
				.setName("Inspect User")
				.setType(ApplicationCommandType.User)
				.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);
		});
	}

	public override async contextMenuRun(
		interaction: Command.ContextMenuCommandInteraction,
	) {
		if (!interaction.isUserContextMenuCommand()) return;

		interaction.reply({
			flags: MessageFlags.IsComponentsV2,
			components: [await userInspectComponent(interaction.user)],
			allowedMentions: {},
		});
	}
}
