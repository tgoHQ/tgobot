import { ApplicationCommandType, ContextMenuCommandBuilder } from "discord.js";
import { MessageContextCommand } from "../index.js";
import OpenAI from "openai";
import env from "../../../lib/util/env.js";

export default {
	data: new ContextMenuCommandBuilder()
		.setName("Ask for context")
		.setType(ApplicationCommandType.Message),
	async execute(interaction) {
		const message = interaction.targetMessage;

		await interaction.deferReply({ ephemeral: true });

		const openai = new OpenAI({
			apiKey: env.OPENAI,
		});

		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content: `the user is being vague and is likely a beginner. respond with a JSON object only. include one key "text" which is a short paragraph saying hello and asking if they will answer some clarifying questions. then an array "questions" of strings containing the clarifying questions so we can help them, such as budget, type of activity, gear list, type of weather/temperature, mileage/length of trip. use "we" instead of "I".`,
				},
				{
					role: "user",
					content: message.content,
				},
			],
		});

		if (!response.choices[0].message.content) {
			console.error();
			return;
		}

		const responseObj: { text: string; questions: string[] } = await JSON.parse(
			response.choices[0].message.content
		);

		//create a string with each question bulleted on a new line
		const questionsStr = [
			responseObj.text,
			...responseObj.questions.map((q) => `- ${q}`),
			`\nRequested by ${interaction.user}.`,
		].join("\n");

		await message.reply(questionsStr);

		interaction.editReply({
			content: "Command successful.",
		});
	},
} satisfies MessageContextCommand;
