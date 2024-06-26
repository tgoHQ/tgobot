// import { SlashCommandBuilder } from "discord.js";
// import { SlashCommand } from "../index.js";
// import show from "./show.js";
// import add from "./add.js";
// // import deleteGearList from "./delete.js";

// export default {
// 	data: new SlashCommandBuilder()
// 		.setName("gearlist")
// 		.addSubcommand(show.data)
// 		.addSubcommand(add.data)
// 		// .addSubcommand(deleteGearList.data)
// 		.setDescription("Check a user's saved gear lists"),

// 	async execute(interaction) {
// 		if (interaction.options.getSubcommand() === show.data.name)
// 			show.execute(interaction);
// 		if (interaction.options.getSubcommand() === add.data.name)
// 			add.execute(interaction);
// 		// if (interaction.options.getSubcommand() === deleteGearList.data.name)
// 		// 	deleteGearList.execute(interaction);
// 	},
// } satisfies SlashCommand;
