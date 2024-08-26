import { Events, Listener } from "@sapphire/framework";

import { AuditLogEvent, Guild, GuildAuditLogsEntry } from "discord.js";
import { container } from "@sapphire/framework";
import ban from "../../lib/moderation/actions/users/ban.js";
import { GUILD } from "../../lib/discord/loadDiscordObjects.js";

export class BanListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options
	) {
		super(context, {
			...options,
			event: Events.GuildAuditLogEntryCreate,
		});
	}

	public async run(auditLog: GuildAuditLogsEntry, guild: Guild) {
		//if this isn't a ban, ignore
		if (auditLog.action !== AuditLogEvent.MemberBanAdd) return;

		//if not from main guild, ignore
		if (guild !== (await GUILD())) return;

		//get target
		if (!auditLog.targetId) return;
		const target = await container.client.users.fetch(auditLog.targetId);

		if (!auditLog.executorId) return;

		//get author
		const author = await container.client.users.fetch(auditLog.executorId);

		//if author is bot, ignore
		if (author === container.client.user) return;

		await ban({
			targetUser: target,
			reason: auditLog.reason ?? undefined,
			author,
			execute: false,
			deleteMessages: false,
		});
	}
}
