import { Command } from "@sapphire/framework";
import { steveAi } from "../../lib/steveAi.js";

export class AskCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("ask")
				.setDescription("Ask Steve Climber a question.")
				.addStringOption((option) =>
					option
						.setName("prompt")
						.setDescription("The question you want to ask")
						.setRequired(true)
				);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	) {
		await interaction.deferReply();

		const prompt = interaction.options.getString("prompt");
		if (!prompt) return;

		const completion = await steveAi([
			{
				role: "user",
				content: prompt,
				name: interaction.user.username.replaceAll(".", "-"),
			},
		]);

		await interaction.editReply(completion);
	}
}
