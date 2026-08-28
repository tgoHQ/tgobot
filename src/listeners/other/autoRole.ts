import { Events, Listener } from "@sapphire/framework";
import { GuildMember } from "discord.js";
import { executeMemberAutoRoles } from "../../lib/autoRole/logic.js";

export class AutoRoleListener extends Listener {
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
		if (oldMember.roles.cache === newMember.roles.cache) return;

		await executeMemberAutoRoles(newMember);
	}
}
