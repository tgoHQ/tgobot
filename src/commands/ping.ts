import { Command } from "@sapphire/framework";

export class PingCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(
			(builder) => {
				builder
					.setName("ping")
					.setDescription("Ping bot to see if it is alive");
			},
			{ idHints: ["1255510066287869962"] }
		);
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	) {
		await interaction.reply({
			content: `Pong!`,
			ephemeral: true,
		});
	}
}
