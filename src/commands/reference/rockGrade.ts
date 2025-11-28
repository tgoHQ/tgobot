import { Command } from "@sapphire/framework";

import {
	MessageFlags,
	ContainerBuilder,
	TextDisplayBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
} from "discord.js";
import { gradeSets } from "../../interaction-handlers/climbingGradeAutocomplete.js";
import { colors } from "../../util/constants.js";
type GradeScale = (typeof gradeSets)[0]["scale"];

export class GradesCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("rockgrade")
				.setDescription(
					"Displays info about a climbing grade and converts it to other scales.",
				)
				.addStringOption((option) =>
					option
						.setName("scale")
						.setDescription("The scale of the grade you're looking up")
						.setRequired(true)
						.addChoices(
							gradeSets.map((e) => {
								return {
									name: e.scale.displayName,
									value: e.scale.name,
								};
							}),
						),
				)
				.addStringOption((option) =>
					option
						.setName("grade")
						.setDescription("The grade to look up")
						.setAutocomplete(true)
						.setRequired(true),
				);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		const input = interaction.options.getString("grade", true);
		const [scaleName, grade] = input.split("@");

		//find grade scale from input
		const scale = gradeSets.find((e) => {
			return e.scale.name === scaleName;
		})?.scale;
		if (!scale) return; //todo

		const conversions = getAllConversionsForGrade(grade, scale);
		const conversionsFormatted = conversions
			.map((e) => `\`${e.grade}\` | ${e.scale.displayName}`)
			.join("\n\n");

		const container = new ContainerBuilder()
			.setAccentColor(colors.staffGreen.decimal)
			.addTextDisplayComponents(
				new TextDisplayBuilder().setContent(
					`# \`${grade}\` | ${scale.displayName}`,
				),
			)
			.addSeparatorComponents(
				new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large),
			)
			.addTextDisplayComponents(
				new TextDisplayBuilder().setContent(
					`**Difficulty:** ${scale.getGradeBand(grade)}`,
				),
			)
			.addSeparatorComponents(
				new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large),
			)
			.addTextDisplayComponents(
				new TextDisplayBuilder().setContent(
					conversionsFormatted.length > 0
						? conversionsFormatted
						: "No conversions available.",
				),
			);

		//for each scale we can convert to, convert it and add a field to the embed

		await interaction.reply({
			flags: MessageFlags.IsComponentsV2,
			components: [container],
		});
	}
}

function getAllConversionsForGrade(grade: string, scale: GradeScale) {
	const score = scale.getScore(grade);

	return gradeSets.flatMap((e) => {
		//do not "convert" it to the scale it already is
		if (e.scale.name === scale.name) return [];

		return {
			scale: e.scale,
			grade: e.scale.getGrade(score),
		};
	});
}
