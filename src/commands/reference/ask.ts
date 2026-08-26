import { Command } from "@sapphire/framework";
import { chatbot } from "../../lib/llm/chatbot.js";

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
						.setRequired(true),
				);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		await interaction.deferReply();

		const prompt = interaction.options.getString("prompt", true);

		if (!interaction.channel || interaction.channel.isDMBased()) return;

		const { text } = await chatbot({
			currentChannel: interaction.channel,
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
		});

		await interaction.editReply(text);
	}
}
