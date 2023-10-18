import { Events, AuditLogEvent } from "discord.js";
import ModLog from "../../modules/modlog/modlog.js";

export default {
	name: Events.GuildBanRemove,
	async execute(client, unban) {
		const fetchedLogs = await unban.guild.fetchAuditLogs({
			limit: 1,
			type: AuditLogEvent.MemberBanRemove,
		});

		// Since there's only 1 audit log entry in this collection, grab the first one
		const unbanLog = fetchedLogs.entries.first();

		// Perform a coherence check to make sure that there's *something*
		if (!unbanLog) {
			return console.log(
				`${unban.user.tag} was unbanned from ${unban.guild.name} but no audit log could be found.`
			);
		}

		// Now grab the user object of the person who unbanned the member
		// Also grab the target of this action to double-check things
		const { executor, target } = unbanLog;

		// Also run a check to make sure that the log returned was for the same banned member
		if (target.id !== unban.user.id) {
			console.log(
				`${unban.user.tag} got hit with the swift hammer of justice in the guild ${unban.guild.name}, audit log fetch was inconclusive.`
			);
			return;
		}

		if (executor.id === client.user.id) {
			console.log("saw unban executed by bot");
			return;
		}

		const modlog = new ModLog({
			type: "Unban",
			author: executor,
			reason: unbanLog.reason,
			targetUser: unban.user,
		});

		modlog.post({
			guild: client.guilds.cache.get(process.env.GUILD_ID),
			client,
		});
	},
};
