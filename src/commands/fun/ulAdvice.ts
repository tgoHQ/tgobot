import { Command } from "@sapphire/framework";

import env from "../../lib/util/env.js";
import OpenAI from "openai";

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
			temperature: 1.2,
			frequency_penalty: 0.1,
			presence_penalty: 0.1,
			max_tokens: 500,
			messages: [
				{
					role: "system",
					content:
						"the user is asking for advice about backpacking gear. tell them how silly they are and that their base weight is too high. tell them to cut their toothbrush in half or shave every milligram possible off their kit. make up other impractical ultralight advice, drawing inspiration from r/ultralight_jerk. Be unhinged and condescending.",
				},
				{
					role: "user",
					content: prompt,
				},
			],
		});

		if (response.choices[0].message.content) {
			await interaction.editReply(
				`**Question**: ${prompt}\n\n**Advice**:\n${response.choices[0].message.content}`
			);
		}
	}
}
