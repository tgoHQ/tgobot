import { Command } from "@sapphire/framework";

import { ApplicationCommandType, ContextMenuCommandType } from "discord.js";
import OpenAI from "openai";
import env from "../../lib/util/env.js";
import { removeTabs } from "../../lib/util/removeTabs";

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
				//todo what is this stupid bullshit and why is it necessary all of a sudden?
				.setType(ApplicationCommandType.Message as ContextMenuCommandType);
		});
	}

	public override async contextMenuRun(
		interaction: Command.ContextMenuCommandInteraction,
	) {
		if (interaction.isMessageContextMenuCommand()) {
			const message = interaction.targetMessage;

			await interaction.deferReply({ ephemeral: true });

			const openai = new OpenAI({
				apiKey: env.OPENAI,
			});

			const response = await openai.chat.completions.create({
				model: "gpt-4o-mini",
				response_format: { type: "json_object" },
				messages: [
					{
						role: "system",
						content: removeTabs(`
							the user is being vague and is likely a beginner to outdoor recreation.

							generate a sentence asking them to answer some clarifying questions so we can help them better.

							generate a list of clarifying questions to ask them. this could include their budget, the type of activity (backpacking, camping, hiking, everyday use, etc.), the type of climate or location, the mileage or length of their trips. Only ask relevant questions that will help us give advice related to their message.
							Ask other questions not specified here if relevant. E.g., ask them questions specific to the type of gear or topic they're wondering about.
							If it's about backpacks, ask for their full "gear list".
							The maximum is 7 questions. The questions must be concise.
							
							format your response in JSON, like this:

							{
								"sentence": string,
								"questions": string[]
							}
						`),
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

			const responseObj: { sentence: string; questions: string[] } =
				await JSON.parse(response.choices[0].message.content);

			//create a string with each question bulleted on a new line
			const questionsStr = [
				responseObj.sentence,
				...responseObj.questions.map((q) => `- ${q}`),
				`\nRequested by ${interaction.user}.`,
			].join("\n");

			await message.reply({ content: questionsStr, allowedMentions: {} });

			interaction.editReply({
				content: "Command successful.",
			});
		}
	}
}
