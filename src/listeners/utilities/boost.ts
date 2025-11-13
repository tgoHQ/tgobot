import { Events, Listener } from "@sapphire/framework";
import { EmbedBuilder, GuildMember } from "discord.js";
import {
	CHANNEL_TOWN_HALL,
	CHANNEL_ALERT,
	ROLE_BOOSTER_COSMETIC,
	CHANNEL_INFO,
	CHANNEL_BOTS,
} from "../../lib/discord/loadDiscordObjects.js";
import { removeTabs } from "../../lib/util/removeTabs.js";
import { colors } from "../../lib/util/constants.js";

export class ReadyListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options,
	) {
		super(context, {
			...options,
			event: Events.GuildMemberUpdate,
		});
	}

	public async run(oldMember: GuildMember, newMember: GuildMember) {
		const cosmeticRole = await ROLE_BOOSTER_COSMETIC();

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
							removeTabs(`
								${newMember} just boosted the server!
								Boosters get perks like a special color, role icon, hoisted sidebar position, external emoji/stickers/sounds, and access to the </ask:1191037845574529086> AI command!
							`),
						)
						.setColor(colors.booster.hex),
				],
				content: newMember.toString(),
			});

			await message.react("🔥");

			//give them the booster cosmetic role
			newMember.roles.add(cosmeticRole);

			//send them a message
			const messageContent = removeTabs(`
				## ${newMember.user} Thank you for boosting The Great Outdoors!

				We're glad you're enjoying the server. You can check out ${await CHANNEL_INFO()} for more information about your booster perks, and run the \`/boosteroptions\` command to manage your perk settings. If you have any questions, feel free to ask by opening a ticket with \`/tickets open\`!
			`);

			(await CHANNEL_BOTS()).send(messageContent);
		}

		//if old member was boosting, and new member is not boosting
		if (oldMember.premiumSince && !newMember.premiumSince) {
			(await CHANNEL_ALERT()).send({
				embeds: [
					new EmbedBuilder()
						.setTitle("<:boost:1256023381690814536> Server Boost Ended")
						.setThumbnail(newMember.displayAvatarURL())
						.setDescription(`${newMember} just stopped boosting the server!`)
						.setColor(colors.booster.hex),
				],
				content: newMember.toString(),
			});

			//remove the booster cosmetic role, if they have it
			if (newMember.roles.cache.has(cosmeticRole.id)) {
				newMember.roles.remove(cosmeticRole);
			}
		}
	}
}
