import { Events, Listener } from "@sapphire/framework";

import { AuditLogEvent, Guild, GuildAuditLogsEntry } from "discord.js";
import { container } from "@sapphire/framework";
import { unban } from "#lib/moderation/actions/users/unban";
import { GUILD } from "#lib/loadDiscordObjects";

export class UnbanListener extends Listener {
	public constructor(
		context: Listener.LoaderContext,
		options: Listener.Options,
	) {
		super(context, {
			...options,
			event: Events.GuildAuditLogEntryCreate,
		});
	}

	public async run(auditLog: GuildAuditLogsEntry, guild: Guild) {
		//if this isn't an unban, ignore
		if (auditLog.action !== AuditLogEvent.MemberBanRemove) return;

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

		await unban({
			targetUser: target,
			reason: auditLog.reason ?? undefined,
			author,
			loggingOnly: true,
		});
	}
}
