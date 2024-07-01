import { Listener } from "@sapphire/framework";

import { GuildMember, Events } from "discord.js";
import { ROLE_BOT } from "../../lib/discord/loadDiscordObjects.js";

export class BotJoinListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options
	) {
		super(context, {
			...options,
			event: Events.GuildMemberAdd,
		});
	}

	public async run(member: GuildMember) {
		//add bot role if new member is a bot
		if (member.user.bot) {
			await member.guild.members.addRole({
				user: member.user,
				role: await ROLE_BOT(),
			});
		}
	}
}
