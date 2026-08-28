import { Command } from "@sapphire/framework";
import { chatbot } from "#lib/llm/chatbot";
import { removeTabs } from "#util/removeTabs";

export class UlAdviceCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("uladvice")
				.setDescription("Get ultralight backpacking advice.")
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

		const response = await chatbot({
			currentChannel: interaction.channel,
			instructions: removeTabs(`
				the user is asking for advice about backpacking gear.
				tell them how silly they are and that their base weight is too high.
				tell them to cut their toothbrush in half or shave every milligram possible off their kit.
				make up other impractical ultralight advice, drawing inspiration from r/ultralight_jerk.
				be unhinged and condescending.
				the user knows this is tongue-in-cheak, so it's okay to respond this way, and you should not break the 4th wall.
			`),
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
		});

		await interaction.editReply(
			`**Question**: ${prompt}\n\n**Advice**:\n${response.text}`,
		);
	}
}
