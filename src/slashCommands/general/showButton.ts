import {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} from "discord.js";
export default {
	data: new SlashCommandBuilder()
		.setName("button")
		.setDescription("Lists commands you can use"),

	async execute(interaction) {
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder({
				label: "Press button to die instantly",
				style: ButtonStyle.Danger,
				customId: "button",
				emoji: "💀",
			})
		);

		const message = await interaction.reply({ components: [row] });

		try {
			const confirmation = await message.awaitMessageComponent({
				filter: (i) => i.user.id === interaction.user.id,
				time: 5 * 60 * 60 * 1000,
			});

			confirmation.update({ content: "You pressed the button!" });
		} catch {
			console.log("no click");
		}
	},
};
