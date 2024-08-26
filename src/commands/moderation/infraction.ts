import { Command } from "@sapphire/framework";

import {
	PermissionFlagsBits,
	APIApplicationCommandOptionChoice,
} from "discord.js";
import {
	InfractionType,
	infraction,
	infractionHandlers,
} from "../../lib/moderation/infractions.js";

//define the list of infractions to be used in the command. generate the string options.
const infractionTypesInCommand = [
	InfractionType.SpammerScammer,
	InfractionType.BadFaith,
	InfractionType.PoliticalControversial,
	InfractionType.Lnt,
	InfractionType.Nsfw,
	InfractionType.PersonalAttacks,
	InfractionType.TrollingShitposting,
	InfractionType.BigotrySlurs,
];
let infractionOptions: APIApplicationCommandOptionChoice<string>[] = [];
for (const key of infractionTypesInCommand) {
	infractionOptions.push({
		name: infractionHandlers[key].string,
		value: key.toString(),
	});
}

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
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("type")
						.setDescription("The type of infraction")
						.setRequired(true)
						.addChoices(...infractionOptions)
				)
				.addStringOption((option) =>
					option
						.setName("comments")
						.setDescription("Any additional comment to log")
				)
				.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);
		});
	}

	public override async chatInputRun(
		interaction: Command.ChatInputCommandInteraction
	) {
		//get options
		const user = interaction.options.getUser("user", true);
		const infractionKey = parseInt(interaction.options.getString("type", true));
		const comment = interaction.options.getString("comments");

		//execute
		const response = await infraction({
			type: infractionKey,
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
