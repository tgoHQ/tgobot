import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	APIApplicationCommandOptionChoice,
} from "discord.js";
import {
	InfractionType,
	infraction,
	infractionHandlers,
} from "../../../lib/moderation/infractions.js";
import { SlashCommand } from "../index.js";

//define the list of infractions to be used in the command. generate the string options.
const infractionTypesInCommand = [
	InfractionType.BadFaith,
	InfractionType.PoliticalControversial,
	InfractionType.Lnt,
	InfractionType.Nsfw,
	InfractionType.PersonalAttacks,
	InfractionType.TrollingShitposting,
	InfractionType.BigotrySlurs,
	InfractionType.SpammerScammer,
];
let infractionOptions: APIApplicationCommandOptionChoice<string>[] = [];
for (const key of infractionTypesInCommand) {
	infractionOptions.push({
		name: infractionHandlers[key].string,
		value: key.toString(),
	});
}

const command = new SlashCommandBuilder()
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
		option.setName("comments").setDescription("Any additional comment to log")
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export default {
	data: command,

	async execute(interaction) {
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
	},
} satisfies SlashCommand;
