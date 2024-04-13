import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../index.js";
import { Emoji } from "../../../lib/util/emoji.js";

export default {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Lists commands you can use"),

	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor("#137c5a")
			.setTitle(`${Emoji.SlashCommand} TGO Command Help`)
			.setDescription(
				`
				</help:1164780041104793631>: Shows this message!
				</snippet:1205576907517599815> Pull up commonly used resources or the answer to an FAQ.

				<id:customize>: See the available roles and choose yours.

				</rank:1010973721076432957>: Check your current level and rank in the server.
				</leaderboard:1010973726558388304>: See the full leaderboard of server ranks.
				</stats message:1025501230044286982>: See server statistics.

				</vcping:1164780041104793632>: Notify users with the vcping role that the VC channel is in use.

				</bump:947088344167366698>: Bump the server on Disboard.

				</tickets open:839848848003825673>: Open a ticket to talk to the server staff.

				\`-gearlist\`: View a user's gear lists.
				\`-setgearlist\`: Edit your saved gear lists.

				</climb:1081349272986988555>: Display info about a climbing route from OpenBeta.
				</crag:1081476008538030140>: Display info about a crag from OpenBeta.
				</grades:1165000063303565312>: Display info about a climbing grade and convert to other scales.
			`.replaceAll("	", "")
			);
		await interaction.reply({ embeds: [embed] });
	},
} satisfies SlashCommand;