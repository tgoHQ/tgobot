import config from "../../config";
import { SlashCommandBuilder } from "discord.js";
import OpenAI from "openai";

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
			apiKey: config.OPENAI,
		});

		const prompt = interaction.options.getString("prompt");

		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content:
						"Provide information about outdoor recreation gear and techniques. Responses are less than 2000 characters.",
				},
				{
					role: "user",
					content: prompt,
				},
			],
		});
		await interaction.editReply(response.choices[0].message.content);
		interaction.channel.send(`Used ${response.usage.total_tokens} tokens.`);
	},
};
