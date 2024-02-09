import {
	EmbedBuilder,
	SlashCommandBuilder,
	SlashCommandStringOption,
} from "discord.js";

const snippets: { name: string; content: string }[] = [
	{
		name: "Rule 1",
		content:
			"Respect the other members of this server. No NSFW content, personal attacks, or bigotry.",
	},
	{
		name: "Rule 2",
		content:
			"Respect the outdoors. Enjoy nature responsibly and leave no trace.",
	},
	{
		name: "Rule 3",
		content:
			"Use the correct channel for your topic. Don't spam, troll, or shitpost.",
	},
	{
		name: "Rule 4",
		content:
			"You may only promote your social media, website, surveys, other servers, etc. once you are <@&594761861770117140> or above. Don't promote through DMs.",
	},
	{
		name: "Rule 5",
		content: "Political or highly controversial topics are not allowed.",
	},
	{
		name: "Backpacking Checklist",
		content:
			"https://www.rei.com/learn/expert-advice/backpacking-checklist.html",
	},
	{
		name: "Camping Checklist",
		content:
			"https://www.rei.com/learn/expert-advice/family-camping-checklist.html",
	},
];

let commandChoices: { name: string; value: string }[] = [];
snippets.forEach((snippet, index) => {
	commandChoices.push({ name: snippet.name, value: index.toString() });
});

export default {
	data: new SlashCommandBuilder()
		.setName("snippet")
		.setDescription("Access snippets stored by the bot.")
		.addStringOption((option) =>
			option
				.setName("snippet")
				.setDescription("The name of the snippet to run")
				.setRequired(true)
				.addChoices(...commandChoices)
		),

	async execute(interaction) {
		const snippet = snippets[interaction.options.getString("snippet")];

		const embed = await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle(snippet.name)
					.setDescription(snippet.content)
					.setColor("#137c5a"),
			],
		});
	},
};
