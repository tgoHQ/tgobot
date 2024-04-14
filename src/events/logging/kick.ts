import { Events } from "discord.js";
import type { Event } from "../index.js";
import { AuditLogEvent } from "discord.js";
import client from "../../lib/discord/client.js";
import { GUILD } from "../../lib/discord/loadDiscordObjects.js";
import kick from "../../actions/users/kick.js";

export default {
	name: Events.GuildAuditLogEntryCreate,
	async execute(auditLog, guild) {
		//if this isn't a kick, ignore
		if (auditLog.action !== AuditLogEvent.MemberKick) return;

		//if not from main guild, ignore
		if (guild !== GUILD) return;

		//get target
		if (!auditLog.targetId) return;
		const target = await client.users.fetch(auditLog.targetId);

		if (!auditLog.executorId) return;

		//get author
		const author = await client.users.fetch(auditLog.executorId);

		//if author is bot, ignore
		if (author === client.user) return;

		await kick({
			targetUser: target,
			reason: auditLog.reason ?? undefined,
			author,
			execute: false,
		});
		return;
	},
} satisfies Event<Events.GuildAuditLogEntryCreate>;
