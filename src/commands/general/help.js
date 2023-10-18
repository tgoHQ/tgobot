import { CommandInteraction, SlashCommandBuilder } from "discord.js";
export default {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Lists commands you can use"),

	async execute(interaction) {
		await interaction.reply(`

    `);
		const embed = new EmbedBuilder()
			.setColor("#137c5a")
			.setTitle("TGO Command Help").setDescription(`
				</help:1048477111612080149>: Shows this message!
				<id:customize>: See the available roles and choose yours.
				</rank:1010973721076432957>: Check your current level and rank in the server.
				</leaderboard:1010973726558388304>: See the full leaderboard of server ranks.
				</stats message:1025501230044286982>: See server statistics.
				</bump:947088344167366698>: Bump the server on Disboard.
				</tickets open:839848848003825673>: Open a ticket to talk to the staff.
				\`-setpacklist {text}\` : Save your pack list(s) for others to see.
				\`-packlist [user]\`: View the pack list of another user or yourself.
			`);
		await interaction.reply({ embeds: [embed] });
	},
};
