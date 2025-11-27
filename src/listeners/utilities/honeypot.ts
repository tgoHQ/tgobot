import { Listener, Events } from "@sapphire/framework";
import { GuildMember } from "discord.js";
import { ROLE_HONEYPOT_ID } from "../../lib/discord/loadDiscordObjects.js";
import {
	infraction,
	InfractionType,
} from "../../lib/moderation/infractions.js";
import { sleep } from "@sapphire/utilities";

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

		//if the member has the honeypot role, and then still has it after the grace period
		if (!newMember.roles.cache.has(honeypotRole.id)) return;
		await sleep(5000);
		if (!newMember.roles.cache.has(honeypotRole.id)) return;

		await infraction({
			type: InfractionType.SpammerScammer,
			user: oldMember.user,
			author: newMember.client.user,
			comment: "Auto-banned for triggering honeypot",
		});
	}
}
