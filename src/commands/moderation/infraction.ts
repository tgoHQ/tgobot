import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import {
	infraction,
	infractionTypes,
} from "../../modules/moderation/infractions/infractions.js";

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
		option.setName("user").setDescription("a").setRequired(true)
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
		//look up infraction type
		//execute infraction

		const user = interaction.options.getUser("user");
		const infractionKey = interaction.options.getString("type");
		const comment = interaction.options.getString("comments");

		const response = await infraction({
			type: infractionKey,
			user,
			author: interaction.user,
			comment,
		});

		interaction.reply(response);
	},
};
