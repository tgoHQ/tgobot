// import { EmbedBuilder, SlashCommandSubcommandBuilder } from "discord.js";
// import { SlashCommandSubcommand } from "../index.js";
// import db from "../../../lib/db/drizzle.js";
// import { gearLists } from "../../../lib/db/schema.js";

// export default {
// 	data: new SlashCommandSubcommandBuilder()
// 		.setName("add")
// 		.setDescription("Save a new gear list")
// 		.addStringOption((option) =>
// 			option
// 				.setName("name")
// 				.setDescription("The name of the gear list")
// 				.setRequired(true)
// 		)
// 		.addStringOption((option) =>
// 			option
// 				.setName("url")
// 				.setDescription("The URL of the gear list")
// 				.setRequired(true)
// 		),

// 	async execute(interaction) {
// 		const row = (
// 			await db
// 				.insert(gearLists)
// 				.values({
// 					name: interaction.options.getString("name", true),
// 					url: interaction.options.getString("url", true),
// 					discordUserId: interaction.user.id,
// 				})
// 				.returning()
// 		)[0];

// 		await interaction.reply({
// 			embeds: [
// 				new EmbedBuilder()
// 					.setTitle("Gear List Added")
// 					.setColor("#137c5a")
// 					.addFields(
// 						{
// 							name: "Name",
// 							value: row.name,
// 						},
// 						{ name: "URL", value: row.url },
// 						{ name: "Gear List ID", value: row.id.toString() }
// 					),
// 			],
// 		});
// 	},
// } satisfies SlashCommandSubcommand;
