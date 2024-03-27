import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import {
	infraction,
	infractionTypes,
} from "../../lib/moderation/users/infractions.js";

let infractionOptions: { name: string; value: string }[] = [];
for (const key in infractionTypes) {
	infractionOptions.push({
		name: infractionTypes[key].string,
		value: key,
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
		interaction.deferReply();

		//get options
		const user = interaction.options.getUser("user");
		const infractionKey = interaction.options.getString("type");
		const comment = interaction.options.getString("comments");

		//execute
		const response = await infraction({
			type: infractionKey,
			user,
			author: interaction.user,
			comment,
		});

		//reply to the command
		interaction.editReply({
			content: `${response.infractionString}\n${response.actionResultsString}`,
		});
	},
};
