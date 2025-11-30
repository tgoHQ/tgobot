import { Command } from "@sapphire/framework";

import {
	ContainerBuilder,
	MessageFlags,
	SeparatorBuilder,
	SeparatorSpacingSize,
	TextDisplayBuilder,
} from "discord.js";
import { removeTabs } from "../../util/removeTabs.js";
import { colors } from "../../util/constants.js";

const snippets = [
	{
		name: "Rule 1",
		content:
			"Respect the other members of this server. No NSFW content, personal attacks, or bigotry.",
	},
	{
		name: "Rule 2",
		content:
			"Respect the outdoors. Enjoy nature responsibly and follow the [Leave No Trace](https://lnt.org/why/7-principles/) principles.",
	},
	{
		name: "Rule 3",
		content:
			"Use the correct channel for your topic. Don't spam, troll, or shitpost.",
	},
	{
		name: "Rule 4",
		content:
			"You may only promote your social media, website, surveys, other servers, etc. once you are <@&594761861770117140> or above. Don't promote through DMs.",
	},
	{
		name: "Rule 5",
		content:
			"5. Political topics, and topics that are controversial in a way not strictly related to outdoor recreation, are not allowed.",
	},
	{
		name: "Backpacking Checklist",
		content:
			"https://www.rei.com/learn/expert-advice/backpacking-checklist.html",
	},
	{
		name: "Camping Checklist",
		content:
			"https://www.rei.com/learn/expert-advice/family-camping-checklist.html",
	},
	{
		name: "Day-Hiking Checklist",
		content:
			"https://www.rei.com/learn/expert-advice/day-hiking-checklist.html",
	},
	{
		name: "Ankle Support",
		content: `
			https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3943374/
			> These findings provide preliminary evidence suggesting that wearing high-top shoes can, in certain conditions, induce a delayed pre-activation timing and decreased amplitude of evertor muscle activity, and may therefore have a detrimental effect on establishing and maintaining functional ankle joint stability.

			https://pubmed.ncbi.nlm.nih.gov/8368420/
			> There was no significant difference among these 3 groups, leading to the conclusion that there is no strong relationship between shoe type and ankle sprains.
			
			https://pubmed.ncbi.nlm.nih.gov/11686947/
			> The protective effect of 'high-top' shoes remains to be established.
		`,
	},
	{
		name: "Weight",
		content: `
			**Worn weight** is the clothing you wear __all the time__ while hiking.
			\`\`\`diff
				# Worn
				+ shirt
				+ hiking shoes
				+ trekking poles

				# Not Worn
				- rain jacket
				- backpack
				- stuff in your pockets
			\`\`\`
			**Consumable weight** is stuff you always use up over the course of the hike.
			\`\`\`diff
				# Consumable
				+ water
				+ food
				+ fuel

				# Not Consumable
				- fuel can
				- first aid supplies
			\`\`\`
			**Base weight** is everything EXCEPT the worn and consumable items.

			**Total pack weight** (or TPW) is the weight of your backpack and everything in it. It's the sum of base weight and consumable weight.

			**From-skin-out weight** is the total weight of everything (base + consumables + worn).
		`,
	},
	{
		name: "Ultralight Cost",
		content: `
			Backpacks
			\`\`\`
				Osprey Atmos 65 AG: 4lb 10 oz, $340
				Granite Gear Crown2 60: 2lb 6 oz, $150

				UL version saves 2lb 4 oz, $190
			\`\`\`
			Stove
			\`\`\`
				MSR pocket rocket 2: 2.6 oz, $60
				BRS 3000t: 1 oz, $19

				UL version saves 1.6 oz, $41
			\`\`\`
			Water bottles
			\`\`\`
				Nalgene 1L: 6.25 oz, $16
				Smartwater 1L: 1.4 oz, $2

				UL version saves 4.85 oz, $14
			\`\`\`
			Shelter footprint
			\`\`\`
				Average fabric tent footprint: 6 oz, $40
				Gossamer Gear polycryo footprint 3.6 oz, $11

				UL version saves 2.4 oz, $29
			\`\`\`
			Headlamp
			\`\`\`
				Black Diamond spot 400: 2.7 oz, $50
				Nitecore nu25 UL: 1.6 oz, $37

				UL version saves 1.1 oz, $13
			\`\`\`
		`,
	},
	{
		name: "VBL",
		content:
			"https://andrewskurka.com/vapor-barrier-liners-theory-application/",
	},
	{
		name: "Layers",
		content: `
			There are three basic types of layers:

			1. Base layers
			These sit directly against the skin to provide wicking, and sometimes warmth.

			2. Insulation layers / midlayers
			These keep heat in your body. Examples include puffy jackets and fleeces.

			3. Shell layers
			These are your outermost layers that protect against rain and wind.
		`,
	},
	{
		name: "Torso Length",
		content: `
			Backpacking packs are sized by torso length. Note that this is different from the *capacity* of the pack, i.e. how much gear it can hold, measured in liters.

			To figure out whether a backpack will fit you, you should review the sizing chart and compare it to your torso length.

			See [this REI article](https://www.rei.com/learn/expert-advice/backpacks-adjusting-fit.html) for more information, including instructions for how to measure your own torso length.
		`,
	},
	{
		name: "Leave No Trace",
		content: `
			Leave No Trace is a set of guidelines for how to minimize damage to the environment while spending time outdoors.
			
			It's comprised of [7 principles](https://lnt.org/why/7-principles/):

			- Plan ahead and prepare
			- Travel and camp on durable surfaces
			- Dispose of waste properly
			- Leave what you find
			- Minimize campfire impacts
			- Respect wildlife
			- Be considerate of others
		`,
	},
	{
		name: "Don't ask to ask",
		content: `https://dontasktoask.com/`,
	},
	{
		name: "Whipsnake",
		content: "https://www.youtube.com/watch?v=ZAtzN_ScKXY",
	},
	{
		name: "Animal ID",
		content: `
			When requesting help with identifying an animal or tracks, providing as much of the following info as possible will make it more likely that you will get a response:
			- Location (country, region, and type of ecosystem)
			- Multiple clear images, showing as much as possible
			- The sounds they made, if applicable
			- The approximate size, or a reference item for scale
			- What you saw the animal doing, if applicable
		`,
	},
	{
		name: "Plant ID",
		content: `
			When requesting help with identifying a plant, providing as much of the following info as possible will make it more likely that you will get a response:
			- Location (country, region, and type of ecosystem)
			- Multiple clear images, showing as much as possible incl. leaves, flowers, stem, fruit, bark, etc
			- The approximate size, or a reference item for scale
		`,
	},
	{
		name: "R-Value",
		content: `
			R-value is a unit used to measure insulation. Within the context of outdoors gear, it's used to describe the warmth of a sleeping pad.
			- It can range from less than 1 (a summer-only pad) to 7 or more (for deep winter).
			- Stacking two or more pads on top of each other will add their R-values together.
			- Pads that don't list an R-value should be assumed to be suitable for summer only.
		`,
	},
] satisfies { name: string; content: string }[];

export class SnippetCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("snippet")
				.setDescription("Access snippets stored by the bot.")
				.addStringOption((option) =>
					option
						.setName("snippet")
						.setDescription("The name of the snippet to run")
						.setRequired(true)
						.addChoices(
							...snippets.map((snippet, index) => {
								return { name: snippet.name, value: index.toString() };
							}),
						),
				)
				.addBooleanOption((option) =>
					option
						.setName("hidden")
						.setDescription("Make the bot's response visible only to you")
						.setRequired(false),
				);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		const snippet: { name: string; content: string } =
			snippets[parseInt(interaction.options.getString("snippet", true))];

		const component = new ContainerBuilder()
			.setAccentColor(colors.staffGreen.decimal)
			.addTextDisplayComponents(
				new TextDisplayBuilder().setContent(`# ${snippet.name}`),
			)
			.addSeparatorComponents(
				new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large),
			)
			.addTextDisplayComponents(
				new TextDisplayBuilder().setContent(removeTabs(snippet.content)),
			);

		await interaction.reply({
			components: [component],
			flags: MessageFlags.IsComponentsV2,
			ephemeral: !!interaction.options.getBoolean("hidden", false),
		});
	}
}
