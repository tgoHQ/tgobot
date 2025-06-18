import { Command } from "@sapphire/framework";
import { PermissionFlagsBits } from "discord.js";
import { photoOfTheWeek } from "../../cron/photoOfWeek.js";

export class PhotoOfWeekCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("photoofweektest")
				.setDescription("test photo of the week")
				.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		await photoOfTheWeek();

		interaction.reply({
			content: "Photo of the week has been awarded! time is" + new Date(),
			ephemeral: true,
		});
	}
}
