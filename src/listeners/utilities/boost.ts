import { Events, Listener } from "@sapphire/framework";
import { EmbedBuilder, GuildMember } from "discord.js";
import { CHANNEL_TOWN_HALL } from "../../lib/discord/loadDiscordObjects.js";

export class ReadyListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options
	) {
		super(context, {
			...options,
			event: Events.GuildMemberUpdate,
		});
	}

	public async run(oldMember: GuildMember, newMember: GuildMember) {
		//if old member was not boosting, and new member is boosting
		if (!oldMember.premiumSince && newMember.premiumSince) {
			const message = await (
				await CHANNEL_TOWN_HALL()
			).send({
				embeds: [
					new EmbedBuilder()
						.setTitle("<:boost:1256023381690814536> New Server Boost")
						.setThumbnail(newMember.displayAvatarURL())
						.setDescription(
							`
							${newMember} just boosted the server!
							Boosters get perks like a special color, role icon, hoisted sidebar position, external emoji/stickers/sounds, and access to the </ask:1191037845574529086> AI command!
						`.replaceAll("	", "")
						)
						.setColor("#ff8950"),
				],
				content: newMember.toString(),
			});

			await message.crosspost();
			await message.react("🔥");
		}
	}
}
