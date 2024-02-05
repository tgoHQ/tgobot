import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Command } from "..";
export default {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Lists commands you can use"),

	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor("#137c5a")
			.setTitle("TGO Command Help").setDescription(`
				</help:1164780041104793631>: Shows this message!

				<id:customize>: See the available roles and choose yours.

				</rank:1010973721076432957>: Check your current level and rank in the server.
				</leaderboard:1010973726558388304>: See the full leaderboard of server ranks.
				</stats message:1025501230044286982>: See server statistics.

				</vcping:1164780041104793632>: Notify users with the vcping role that the VC channel is in use.

				</bump:947088344167366698>: Bump the server on Disboard.

				</tickets open:839848848003825673>: Open a ticket to talk to the server staff.

				</gearlist:1187494085561430076>: View a user's gear lists.
				</gearlist set:>: Edit your saved gear lists.

				</climb:1081349272986988555>: Display info about a climbing route from OpenBeta.
				</crag:1081476008538030140>: Display info about a crag from OpenBeta.
				</grades:1165000063303565312>: Display info about a climbing grade and convert to other scales.
			`);
		await interaction.reply({ embeds: [embed] });
	},
} satisfies Command;
