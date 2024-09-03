import { Command } from "@sapphire/framework";

export class GuideCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("guide")
				.setDescription("Find an article from the guide.")
				.addStringOption((option) =>
					option
						.setName("query")
						.setDescription("Your search query")
						.setAutocomplete(true)
						.setRequired(true)
				)
				.addUserOption((option) =>
					option
						.setName("user")
						.setDescription("Ping this user in the bot's response")
						.setRequired(false)
				)
				.addBooleanOption((option) =>
					option
						.setName("hidden")
						.setDescription("Make the bot's response visible only to you")
						.setRequired(false)
				);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	) {
		const taggedUser = interaction.options.getUser("user", false);
		interaction.reply({
			content: `${interaction.options.getString("query", true)}\n${
				taggedUser ?? ""
			}`,
			ephemeral: !!interaction.options.getBoolean("hidden", false),
		});
	}
}
