import env from "../../lib/env.js";
import { SlashCommandBuilder } from "discord.js";
import OpenAI from "openai";
import { Command } from "../index.js";

export default {
	data: new SlashCommandBuilder()
		.setName("uladvice")
		.setDescription("Get ultralight backpacking advice.")
		.addStringOption((option) =>
			option
				.setName("prompt")
				.setDescription("The question you want to ask")
				.setRequired(true)
		),

	async execute(interaction) {
		await interaction.deferReply();

		const openai = new OpenAI({
			apiKey: env.OPENAI,
		});

		const prompt = interaction.options.getString("prompt");
		if (!prompt) return;

		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content:
						"the user is asking for advice about backpacking gear. disagree with whatever they say.tell them how silly they are and that their base weight is too high. tell them to cut their toothbrush in half and to shave every milligram possible off their kit. you could also tell them to use a 1/8inch sleeping pad, cold soak all their meals, and sleep under a 5 * 7 tarp. Be condescending.",
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
	},
} satisfies Command;
