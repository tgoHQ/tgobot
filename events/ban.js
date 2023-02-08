const { Events } = require("discord.js");
const ModLog = require("../modules/modlog");

module.exports = {
	name: Events.GuildBanAdd,
	async execute(client, ban) {
		const fetchedLogs = await ban.guild.fetchAuditLogs({
			limit: 1,
			type: AuditLogEvent.MemberBanAdd,
		});

		// Since there's only 1 audit log entry in this collection, grab the first one
		const banLog = fetchedLogs.entries.first();

		// Perform a coherence check to make sure that there's *something*
		if (!banLog)
			return console.log(
				`${ban.user.tag} was banned from ${ban.guild.name} but no audit log could be found.`
			);

		// Now grab the user object of the person who banned the member
		// Also grab the target of this action to double-check things
		const { executor, target } = banLog;

		// Also run a check to make sure that the log returned was for the same banned member
		if (target.id !== ban.user.id) {
			console.log(
				`${ban.user.tag} got hit with the swift hammer of justice in the guild ${ban.guild.name}, audit log fetch was inconclusive.`
			);
			return;
		}

		console.log(
			`${ban.user.tag} got hit with the swift hammer of justice in the guild ${ban.guild.name}, wielded by the mighty ${executor.tag}`
		);

		const modlog = new ModLog({
			type: "Ban",
			author: executor,
			reason: "",
			targetUser: user,
		});

		console.log(process.env.GUILD_ID);

		modlog.post({
			guild: client.guilds.cache.get(process.env.GUILD_ID),
			client,
		});
	},
};
