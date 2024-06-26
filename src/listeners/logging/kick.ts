import { Listener, Events } from "@sapphire/framework";
import { AuditLogEvent, Guild, GuildAuditLogsEntry } from "discord.js";
import { container } from "@sapphire/framework";
import { GUILD } from "../../lib/discord/loadDiscordObjects.js";
import kick from "../../lib/moderation/actions/users/kick.js";

export class KickListener extends Listener {
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
		//if this isn't a kick, ignore
		if (auditLog.action !== AuditLogEvent.MemberKick) return;

		//if not from main guild, ignore
		if (guild !== await GUILD()) return;

		//get target
		if (!auditLog.targetId) return;
		const target = await container.client.users.fetch(auditLog.targetId);

		if (!auditLog.executorId) return;

		//get author
		const author = await container.client.users.fetch(auditLog.executorId);

		//if author is bot, ignore
		if (author === container.client.user) return;

		await kick({
			targetUser: target,
			reason: auditLog.reason ?? undefined,
			author,
			execute: false,
		});
	}
}
