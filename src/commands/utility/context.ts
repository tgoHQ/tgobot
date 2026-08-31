import { Command } from "@sapphire/framework";

import { ApplicationCommandType } from "discord.js";
import { removeTabs } from "#util/removeTabs";
import { z } from "zod";

import { chatbot } from "#lib/llm/chatbot";

const responseSchema = z.object({
	sentence: z.string(),
	questions: z.array(z.string()),
});

export class ContextCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerContextMenuCommand((builder) => {
			builder
				.setName("Ask for context")
				.setType(ApplicationCommandType.Message);
		});
	}

	public override async contextMenuRun(
		interaction: Command.ContextMenuCommandInteraction,
	) {
		if (!interaction.isMessageContextMenuCommand()) return;
		if (!interaction.channel || interaction.channel.isDMBased()) return;

		interaction.deferReply({ ephemeral: true });

		const response = await chatbot({
			instructions: removeTabs(`
				1. The user is being vague and is likely a beginner to outdoor recreation.

				2. Generate a sentence asking them to answer some clarifying questions so we can help them better. (You, the AI, are not the one asking/answering the questions, rather it is the helper who ran the command)

				3. Generate a list of clarifying questions to ask them.
					- Only ask relevant questions that will help us give advice related to their message.
					- This could include their budget, the type of activity (backpacking, camping, hiking, everyday use, etc.), the type of climate or location, the mileage or length of their trips, their full gear list, etc.
					- Ask other questions not specified here if relevant. E.g., ask them questions specific to the type of gear or topic they're wondering about.
					- Do not just ask the example questions I gave you every time- ask things that would be relevant for us to know in order to help the user better.
					- The maximum is 6 questions. The questions must be SHORT AND CONCISE. Only generate all 6 questions if it's truly necessary.
			`),
			currentChannel: interaction.channel,
			responseSchema,
			messages: [
				{
					role: "user",
					content: interaction.targetMessage.content,
				},
			],
			cache: false,
		});

		console.log(response.output);

		const output = responseSchema.parse(response.output);

		//create a string with each question bulleted on a new line
		const responseContent = removeTabs(`
			${output.sentence}
			${output.questions.map((q) => `- ${q}`).join("\n")}
			-# AI-generated message. Triggered by ${interaction.user}.
		`);

		await interaction.targetMessage.reply({
			content: responseContent,
			allowedMentions: {},
		});

		interaction.editReply({
			content: "Command successful.",
		});
	}
}
