import { Events } from "discord.js";
import type { Event } from "../index.js";
import { AuditLogEvent } from "discord.js";
import client from "../../lib/client.js";
import ban from "../../lib/moderation/users/actions/ban.js";
import { GUILD } from "../../lib/loadDiscordObjects.js";

export default {
	name: Events.GuildAuditLogEntryCreate,
	async execute(auditLog, guild) {
		//if this isn't a ban, ignore
		if (auditLog.action !== AuditLogEvent.MemberBanAdd) return;

		//if not from main guild, ignore
		if (guild !== GUILD) return;

		//get target
		if (!auditLog.targetId) return;
		const target = await client.users.fetch(auditLog.targetId);

		//get author. if no author use bot
		const author = await client.users.fetch(
			auditLog.executorId ?? client.user!.id
		);

		await ban({
			user: target,
			reason: auditLog.reason ?? undefined,
			author,
			execute: false,
		});
		return;
	},
} satisfies Event<Events.GuildAuditLogEntryCreate>;
