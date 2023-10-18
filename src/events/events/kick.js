import { Events, AuditLogEvent } from "discord.js";
import ModLog from "../../modules/modlog/modlog.js";

export default {
	name: Events.GuildMemberRemove,
	async execute(client, member) {
		const fetchedLogs = await member.guild.fetchAuditLogs({
			limit: 1,
			type: AuditLogEvent.MemberKick,
		});

		// Since there's only 1 audit log entry in this collection, grab the first one
		const kickLog = fetchedLogs.entries.first();

		// Perform a coherence check to make sure that there's *something*
		if (!kickLog) {
			return;
		}

		// Now grab the user object of the person who banned the member
		// Also grab the target of this action to double-check things
		const { executor, target } = kickLog;

		// Also run a check to make sure that the log returned was for the same banned member
		if (target.id !== member.user.id) {
			console.log(
				`${member.user.tag} was kicked, audit log fetch was inconclusive.`
			);
			return;
		}

		//TODO check the time between now and the audit log to avoid saying a previously kicked user was kicked again, when this time it was a leave

		if (executor.id === client.user.id) {
			console.log("saw ban executed by bot");
			return;
		}

		const modlog = new ModLog({
			type: "Kick",
			author: executor,
			reason: kickLog.reason,
			targetUser: member.user,
		});

		modlog.post({
			guild: client.guilds.cache.get(process.env.GUILD_ID),
			client,
		});
	},
};
