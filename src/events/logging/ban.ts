import { Events } from "discord.js";
import type { Event } from "../index.js";
import { AuditLogEvent } from "discord.js";
import client from "../../lib/client.js";
import ban from "../../lib/moderation/users/actions/ban.js";

export default {
	name: Events.GuildAuditLogEntryCreate,
	async execute(auditLog) {
		console.log(0);
		if (auditLog.action !== AuditLogEvent.MemberBanAdd) return;
		console.log(1);
		if (!auditLog.targetId) throw new Error("No target found");

		//if no author found, use bot
		const author = await client.users.fetch(
			auditLog.executorId ?? client.user!.id
		);

		const target = await client.users.fetch(auditLog.targetId);

		ban({
			user: target,
			reason: auditLog.reason ?? "",
			author,
			execute: false,
		});
	},
} satisfies Event<Events.GuildAuditLogEntryCreate>;
