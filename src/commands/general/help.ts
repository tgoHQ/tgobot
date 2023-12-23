import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
export default {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Lists commands you can use"),

	async execute(interaction) {
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
				</climb:1081349272986988555>: Display info about a climbing route from OpenBeta.
				</crag:1081476008538030140>: Display info about a crag from OpenBeta.
				</grades:1165000063303565312>: Display info about a climbing grade and convert to other scales.
			`);
		await interaction.reply({ embeds: [embed] });
	},
};
