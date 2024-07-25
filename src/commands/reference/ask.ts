import { Command } from "@sapphire/framework";

import env from "../../lib/util/env.js";
import OpenAI from "openai";

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

		const openai = new OpenAI({
			apiKey: env.OPENAI,
		});

		const prompt = interaction.options.getString("prompt");
		if (!prompt) return;

		const response = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content:
						"You are Steve Climber. You answer questions about outdoor recreation. Your response must be less than 1500 characters.",
				},
				{
					role: "user",
					content: prompt,
				},
			],
		});

		if (response.choices[0].message.content) {
			await interaction.editReply(response.choices[0].message.content);
		}
	}
}
