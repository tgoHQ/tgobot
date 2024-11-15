import { Command } from "@sapphire/framework";

import env from "../../lib/util/env.js";
import OpenAI from "openai";

const experts = [
	{
		userId: "247070105916276736",
		achievements:
			"Thru-Hiked Appalachian Trail NOBO (2022), Eagle Scout, Thru-Hiked New England Trail SOBO (2023),",
		qualifications: "Scoutmaster",
		skills:
			"Backpacking, Ultralight, Camping, Scouting, Long-Distance Hiking, Thru-Hiking, Scouting",
	},
	{
		userId: "284516292441014272",
		achievements: "Hiked hundreds of miles of the PCT",
		qualifications: "AMGA-certified single-pitch mountain guide",
		skills: "climbing, backpacking",
	},
	{
		userId: "206285700486791168",
		achievements:
			"Images published in largest Underground Electronic music news outlet",
		qualifications: "Professional photographer",
		skills:
			"Photography, landscape photography, low-light photography, no flash high motion photography, nature photography, astrophotography, Adobe Lightroom, offroading, dispersed camping, car camping, map reading, Gaia GPS, public lands maps reading",
	},
] satisfies {
	userId: string;
	achievements: string;
	qualifications: string;
	skills: string;
}[];

export class FindExpertCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("findexpert")
				.setDescription("Find an expert to answer your questions.")
				.addStringOption((option) =>
					option
						.setName("subject")
						.setDescription(
							"The question or topic you're seeking an expert for"
						)
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

		const prompt = interaction.options.getString("subject", true);

		const response = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			response_format: { type: "json_object" },
			messages: [
				{
					role: "system",
					content: `Below the dashes is a list of experts in various disciplines of outdoor recreation. For each person, there are 3 strings containing comma-separated tags.
						
						"achievements" are notable accomplisments this person has. "qualifications" are certifications or professional/volunteer experience. "skills" is the list of skills and areas of interest this person has.

						The user's prompt will be a question or topic. You are to select the most relevant expert who can give an authoritative answer to the user's question.

						Your response must be json structured as follows:

						{
							userId: string,
							description: string
						}

						userId must be the expert's userId. description must be a single sentence describing the expert, with only information relevant to the user's prompt. do not include any irrelevant information.

						here is the list of experts:
						---
						${JSON.stringify(experts, null, 2)}
						`,
				},
				{
					role: "user",
					content: prompt,
				},
			],
		});

		if (response.choices[0].message.content) {
			const parsed = JSON.parse(response.choices[0].message.content) as {
				userId: string;
				description: string;
			};

			await interaction.editReply(`<@${parsed.userId}>: ${parsed.description}`);
		}
	}
}
