const {
	Events,
	AuditLogEvent,
	MentionableSelectMenuBuilder,
} = require("discord.js");
const ModLog = require("../modules/modlog");

module.exports = {
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
