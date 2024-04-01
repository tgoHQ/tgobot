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
			temperature: 1.27,
			frequency_penalty: 0.1,
			presence_penalty: 0.1,
			max_tokens: 300,
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
	},
} satisfies Command;
