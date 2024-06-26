// import { SlashCommandSubcommandBuilder } from "discord.js";
// import { SlashCommandSubcommand } from "../index.js";
// import db from "../../../lib/db/drizzle.js";

// export default {
// 	data: new SlashCommandSubcommandBuilder()
// 		.setName("delete")
// 		.setDescription("Delete one of your saved gear lists")
// 		.addStringOption((option) =>
// 			option
// 				.setName("name")
// 				.setDescription("The name of the list to be deleted")
// 				.setAutocomplete(true)
// 		),
// 	async execute(interaction) {
// 		const name = interaction.options.getString("name", true);
// 		interaction.reply(name);
// 	},
// 	async autocomplete(interaction) {
// 		const focusedValue = interaction.options.getFocused();
// 		const rows = await db.query.gearLists.findMany({
// 			where: (gearLists, { eq }) =>
// 				eq(gearLists.discordUserId, interaction.user.id),
// 		});

// 		const filtered = rows.filter((row) => row.name.startsWith(focusedValue));
// 		await interaction.respond(
// 			filtered.map((row) => ({ name: row.name, value: row.id }))
// 		);
// 	},
// } satisfies SlashCommandSubcommand;
