import { Command } from "@sapphire/framework";
import { PermissionFlagsBits } from "discord.js";
import { createInfraction } from "../../lib/moderation/infractions/createInfraction.js";
import { InfractionTypes } from "../../lib/moderation/infractions/handlers.js";

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
						.setName("type")
						.setDescription("The type of infraction")
						.setRequired(true)
						.addChoices(
							...Object.entries(InfractionTypes).map(([key, handler]) => {
								return {
									name: handler.humanName,
									value: key,
								};
							}),
						),
				)
				.addStringOption((option) =>
					option
						.setName("comments")
						.setDescription("Any additional comment to log"),
				)
				.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction,
	) {
		//get options
		const user = interaction.options.getUser("user", true);
		const infractionKey = interaction.options.getString("type", true);
		const comment = interaction.options.getString("comments");

		//execute
		const response = await createInfraction({
			//@ts-expect-error
			type: InfractionTypes[infractionKey],
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
