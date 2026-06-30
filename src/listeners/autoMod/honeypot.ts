import { Listener, Events } from "@sapphire/framework";
import { GuildMember } from "discord.js";
import { ROLE_HONEYPOT_ID } from "../../lib/loadDiscordObjects.js";
import { CHANNEL_ALERT } from "../../lib/loadDiscordObjects.js";

export class HoneypotListener extends Listener {
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
		const honeypotRole = await ROLE_HONEYPOT_ID();

		//if newMember doesn't have the honeypot role, return
		if (!newMember.roles.cache.has(honeypotRole.id)) return;

		//if oldMember already had the honeypot role, return
		if (oldMember.roles.cache.has(honeypotRole.id)) return;

		const alertsChannel = await CHANNEL_ALERT();

		await alertsChannel.send(`${newMember} has selected the honeypot role.`);
	}
}
