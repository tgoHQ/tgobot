// import { Command } from "@sapphire/framework";

// import env from "../../lib/util/env.js";
// import OpenAI from "openai";
// import { zodResponseFormat } from "openai/helpers/zod";
// import { z } from "zod";

// const experts = [
// 	{
// 		id: "247070105916276736",
// 		achievements:
// 			"Thru-Hiked Appalachian Trail NOBO (2022), Eagle Scout, Thru-Hiked New England Trail SOBO (2023),",
// 		qualifications: "Scoutmaster",
// 		skills:
// 			"Backpacking, Ultralight, ultralight backpacking gear, technical backpacking, gear specs and materials, Camping, Scouting, Long-Distance Hiking, Thru-Hiking, Scouting",
// 	},
// 	{
// 		id: "284516292441014272",
// 		achievements: "Hiked hundreds of miles of the PCT",
// 		qualifications: "AMGA-certified single-pitch mountain guide",
// 		skills: "climbing, backpacking",
// 	},
// 	{
// 		id: "206285700486791168",
// 		achievements:
// 			"Images published in largest Underground Electronic music news outlet",
// 		qualifications: "Professional photographer",
// 		skills:
// 			"Photography, landscape photography, low-light photography, no flash high motion photography, nature photography, astrophotography, Adobe Lightroom, offroading, dispersed camping, car camping, map reading, Gaia GPS, public lands maps reading",
// 	},
// 	{
// 		id: "687431572886126666",
// 		achievements:
// 			"qualified for and competed in Iditarod Trail Invitational 350mile ski race,  section hiked 50% of the Appalachian Trail, thru-hiked the Long Trail",
// 		qualifications: "NOLS First Aid, Iditarod Trail Invitational Training Camp",
// 		skills:
// 			"All season hiking and backpacking with dogs, section hiking, winter distance trekking, skijoring, Nordic skiing, downhill skiing, hiking in vermont and new hampshire",
// 	},
// 	{
// 		id: "114017862582009863",
// 		achievements:
// 			"Completed the New Hampshire 4000fters, Single Day Presidential Traverse, Single Day Pemi Loop",
// 		qualifications:
// 			"Appalachian Mountain Club kayaking trip leader, White Mountains trail adopter, Appalachian Mountain Club Winter Leadership training",
// 		skills:
// 			"Hiking, Winter Hiking, Bushwhacking, Map and Compass Navigation, Kayaking, Whitewater Kayaking, Trail Work",
// 	},
// 	{
// 		id: "430542368362725397",
// 		achievements: `
// 			Short thru-hikes:
// 				John Muir Trail
// 				High Sierra Trail
// 				Wonderland Trail
// 				Lost Coast Trail
// 			Lead groups on many endurance day hikes (e.g., >30mi/10k ft),
// 			Peakbagging, including:
// 				Mount Whitney (14498 ft) (USA-CA)
// 				Mount Elbert (14438 ft) (USA-CO)
// 				Mount Massive (14424 ft) (USA-CO)
// 				Grays Peak (14276 ft) (USA-CO)
// 				Torreys Peak (14272 ft) (USA-CO)
// 				Quandary Peak (14271 ft) (USA-CO)
// 				White Mountain Peak (14246 ft) (USA-CA)
// 				Mount Shasta (14162 ft) (USA-CA)
// 				Pikes Peak (14109 ft) (USA-CO)
// 				Mount Bierstadt (14066 ft) (USA-CO)
// 				Split Mountain (14058 ft) (USA-CA)
// 				Mount Sherman (14042 ft) (USA-CO)
// 				Mount Langley (14026 ft) (USA-CA)
// 				Mount Tyndall (14019 ft) (USA-CA)
// 				Mauna Kea (13796 ft) (USA-HI)
// 				Wheeler Peak (13162 ft) (USA-NM)
// 				Mount Dana (13060 ft) (USA-CA)
// 				Humphreys Peak (12633 ft) (USA-AZ)
// 				Mount Adams (12273 ft) (USA-WA)
// 				San Jacinto Peak (10839 ft) (USA-CA)
// 				Mount Baker (10773 ft) (USA-WA)
// 				Lassen Peak (10457 ft) (USA-CA)
// 				South Sister (10358 ft) (USA-OR)
// 				Pyramid Peak (9988 ft) (USA-CA)
// 				Dicks Peak (9975 ft) (USA-CA)
// 				Clouds Rest (9930 ft) (USA-CA)
// 				Mount Tallac (9735 ft) (USA-CA)
// 				Half Dome (8846 ft) (USA-CA)
// 				Guadalupe Peak (8750 ft) (USA-TX)
// 				Sentinel Dome (8125 ft) (USA-CA)
// 				Mount Hoffman (7913 ft) (USA-CA)
// 				El Capitan (7569 ft) (USA-CA)
// 				North Dome (7539 ft) (USA-CA)
// 				Glacier Point (7214 ft) (USA-CA)
// 				Angels Landing (5794 ft) (USA-UT)
// 				Mount Saint Helena (4341 ft) (USA-CA)
// 				Mount Saint Helena - South Peak (4003 ft) (USA-CA)
// 				Mount Diablo (3849 ft) (USA-CA)
// 				Rose Peak (3818 ft) (USA-CA)
// 				North Peak (3557 ft) (USA-CA)
// 				Mount Umunhum (3486 ft) (USA-CA)
// 				Mount Sizer (3222 ft) (USA-CA)
// 				Summit Rock (3076 ft) (USA-CA)
// 				El Sombroso (3021 ft) (USA-CA)
// 				Dog Mountain (2948 ft) (USA-WA)
// 				Mount Olympia (2946 ft) (USA-CA)
// 				Goat Rock (2920 ft) (USA-CA)
// 				Black Mountain (2815 ft) (USA-CA)
// 				Monument Peak (2600 ft) (USA-CA)
// 				Mount Tamalpais - West Peak (2577 ft) (USA-CA)
// 				Mount Tamalpais - East Peak (2575 ft) (USA-CA)
// 				Borel Hill (2572 ft) (USA-CA)
// 				Mission Peak (2519 ft) (USA-CA)
// 				Table Rock (2462 ft) (USA-CA)
// 				Bald Mountain (2387 ft) (USA-CA)
// 				Eagle Peak (2369 ft) (USA-CA)
// 				Mindego Hill (2148 ft) (USA-CA)
// 				Spencer Butte (2054 ft) (USA-OR)
// 				Windy Hill (1930 ft) (USA-CA)
// 				Mount Madonna (1900 ft) (USA-CA)
// 				Montara Mountain (1898 ft) (USA-CA)
// 				Eagle Peak (1720 ft) (USA-CA)
// 				Mount Pisgah (1520 ft) (USA-OR)
// 				Mount Baldy (1233 ft) (USA-OR)
// 				Moon Mountain (982 ft) (USA-OR)
// 				Mount Sutro (916 ft) (USA-CA)
// 				Skinner Butte (682 ft) (USA-OR)
// 			`,
// 		qualifications: `
// 			National Ski Patrol Avalanche 1 & 2 (equivalent AIARE 1),
// 			Crevasse rescue,
// 			NOLS Wilderness First Aid (WFA),
//         `,
// 		skills: `
// 			Hiking,
// 			Backpacking: water treatment, sleep systems, lightweight backpacking gear,
// 			Cross-country skiing,
// 			Snowshoeing,
// 			Talking people out of snowshoeing because cross-country skiing exists,
// 			Desert hiking,
// 			Snow travel,
// 			Hammock camping,
// 			Snow camping,
// 			#vanlife,
// 		`,
// 	},
// ] satisfies {
// 	id: string;
// 	achievements: string;
// 	qualifications: string;
// 	skills: string;
// }[];

// const responseSchema = z.object({
// 	experts: z.array(z.object({ id: z.string(), description: z.string() })),
// });

// export class FindExpertCommand extends Command {
// 	public constructor(context: Command.LoaderContext, options: Command.Options) {
// 		super(context, {
// 			...options,
// 		});
// 	}
// 	public override registerApplicationCommands(registry: Command.Registry) {
// 		registry.registerChatInputCommand((builder) => {
// 			builder
// 				.setName("findexpert")
// 				.setDescription("Find an expert to answer your questions.")
// 				.addStringOption((option) =>
// 					option
// 						.setName("subject")
// 						.setDescription(
// 							"The question or topic you're seeking an expert for",
// 						)
// 						.setRequired(true),
// 				);
// 		});
// 	}

// 	public override async chatInputRun(
// 		interaction: Command.ChatInputCommandInteraction,
// 	) {
// 		await interaction.deferReply();

// 		const openai = new OpenAI({
// 			apiKey: env.OPENAI,
// 		});

// 		const prompt = interaction.options.getString("subject", true);

// 		const response = await openai.chat.completions.create({
// 			model: "o4-mini-2025-04-16",
// 			response_format: zodResponseFormat(responseSchema, "selected_experts"),

// 			messages: [
// 				{
// 					role: "system",
// 					content: `Below the dashes is a list of experts in various disciplines of outdoor recreation. For each person, there are 3 strings containing comma-separated tags.
						
// 						"achievements" are notable accomplisments this person has. "qualifications" are certifications or professional/volunteer experience. "skills" is the list of skills and areas of interest this person has.

// 						The user's prompt will be a question or topic. You are to select the most relevant expert who can give an authoritative answer to the user's question.

// 						instructions for experts json response:
// 						id must be the expert's id. description must be a single sentence describing the expert, with only information relevant to the user's prompt. do not include any irrelevant information.
// 						you may return up to 3 experts, but only if multiple are highly relevant. put them in order from most to least relevant. DO NOT INCLUDE EXTRA PEOPLE WHO ARE LESS RELEVANT. ONLY SELECT EXPERTS IF THEY ARE HIGHLY RELEVANT AND HAVE A BACKGROUND SPECIFICALLY, EXPLICITLY RELATED TO THE QUESTION.
// 						you may also return an empty array if nobody is qualified to answer the user's question.

// 						here is the list of experts:
// 						---
// 						${JSON.stringify(experts, null, 2)}
// 						`,
// 				},
// 				{
// 					role: "user",
// 					content: prompt,
// 				},
// 			],
// 		});

// 		if (response.choices[0].message.content) {
// 			const selectedExperts = response.choices[0].message.content.experts;
// 			console.log(
// 				response.usage?.prompt_tokens,
// 				response.usage?.completion_tokens,
// 			);

// 			const expertStrings = selectedExperts.map((expert) => {
// 				return `<@${expert.id}>: ${expert.description}`;
// 			});

// 			const text = expertStrings.join("\n");
// 			await interaction.editReply({ content: text, allowedMentions: {} });
// 		}
// 	}
// }
