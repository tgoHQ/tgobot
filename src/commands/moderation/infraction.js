import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import infractionTypes from "../../modules/moderation/infractionTypes.js";

let infractionOptions = [];

for (const key in infractionTypes) {
	console.log(key);
	infractionOptions.push({
		name: infractionTypes[key].pretty,
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
			.setDescription("a")
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

		infractionTypes[infractionKey].execute(user);

		interaction.reply("test");
	},
};
