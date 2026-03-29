import { Command } from "@sapphire/framework";
import { AutocompleteInteraction, PermissionFlagsBits } from "discord.js";
import { createInfraction } from "../../lib/moderation/infractions/createInfraction.js";
import { InfractionTypes } from "../../lib/moderation/infractions/infractionTypes.js";

const infractionGroups = [...new Set(InfractionTypes.map((e) => e.group))];

export class InfractionCommand extends Command {
	public constructor(context: Command.LoaderContext, options: Command.Options) {
		super(context, {
			...options,
		});
	}
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand((builder) => {
			builder
				.setName("infraction")
				.setDescription("Record a user infraction.")
				.addUserOption((option) =>
					option
						.setName("user")
						.setDescription("The user who committed the infraction")
						.setRequired(true),
				)
				.addStringOption((option) =>
					option
						.setName("group")
						.setDescription("The group/category of infraction")
						.setRequired(true)
						.addChoices(
							...infractionGroups.map((name) => {
								return {
									name,
									value: name,
								};
							}),
						),
				)
				.addStringOption((option) =>
					option
						.setName("type")
						.setDescription("The type of infraction")
						.setRequired(true)
						.setAutocomplete(true),
				)
				.addStringOption((option) =>
					option
						.setName("comments")
						.setDescription("Any additional comment to log"),
				)
				.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);
		});
	}

	public override autocompleteRun(interaction: AutocompleteInteraction) {
		const group = interaction.options.getString("group", true);

		const options = InfractionTypes.filter((e) => e.group === group).map(
			(e) => {
				return {
					name: e.title,
					value: e.title,
				};
			},
		);

		return interaction.respond(options);
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		//get options
		const user = interaction.options.getUser("user", true);

		const infractionGroupName = interaction.options.getString("group", true);
		const infractionTypeName = interaction.options.getString("type", true);

		const infractionType = InfractionTypes.find(
			(e) => e.group === infractionGroupName && e.title === infractionTypeName,
		);
		if (!infractionType) throw new Error("Invalid infraction type");

		const comment = interaction.options.getString("comments");

		//execute
		const response = await createInfraction({
			type: infractionType,
			user,
			author: interaction.user,
			comment,
		});

		//reply to the command
		interaction.reply({
			content: `${response.infractionString}\n${response.actionResultsString}`,
		});
	}
}
