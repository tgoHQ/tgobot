import env from "../../util/env.js";
import { SlashCommandBuilder, Interaction } from "discord.js";
import OpenAI from "openai";
import { Command } from "../index.js";

export default {
	data: new SlashCommandBuilder()
		.setName("ask")
		.setDescription("Ask Steve Climber a question.")
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

		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content:
						"Provide information about outdoor recreation gear and techniques. Responses must be less than 2000 characters.",
				},
				{
					role: "user",
					content: prompt,
				},
			],
		});
		await interaction.editReply(response.choices[0].message.content);
	},
};
