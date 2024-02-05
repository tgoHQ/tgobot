import { SlashCommandBuilder } from "discord.js";

const snippets = [
	{
		name: "Rule 1",
		value:
			"Respect the other members of this server. No NSFW content, personal attacks, or bigotry.",
	},
	{
		name: "Rule 2",
		value: "Respect the outdoors. Enjoy nature responsibly and leave no trace.",
	},
	{
		name: "Rule 3",
		value:
			"Use the correct channel for your topic. Don't spam, troll, or shitpost.",
	},
	// {
	// 	name: "Rule 4",
	// 	value:
	// 		"You may only promote your social media, website, surveys, other servers, etc. once you are <@&594761861770117140> or above. Don't promote through DMs.",
	// },
	{
		name: "Rule 5",
		value: "Political or highly controversial topics are not allowed.",
	},
	// {
	// 	name: "Backpacking Checklist",
	// 	value: "https://www.rei.com/learn/expert-advice/backpacking-checklist.html",
	// },
	// {
	// 	name: "Camping Checklist",
	// 	value:
	// 		"https://www.rei.com/learn/expert-advice/family-camping-checklist.html",
	// },
];

export default {
	data: new SlashCommandBuilder()
		.setName("snippet")
		.setDescription("Access snippets stored by the bot.")
		.addStringOption((option) =>
			option
				.setName("snippet")
				.setDescription("The name of the snippet")
				.setRequired(true)
				.addChoices(...snippets)
		),

	async execute(interaction) {
		const snippet = interaction.options.getString("snippet");
		await interaction.reply(snippet);
	},
};
