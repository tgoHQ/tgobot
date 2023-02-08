const { Events, AuditLogEvent } = require("discord.js");
const ModLog = require("../modules/modlog");

module.exports = {
	name: Events.MessageBulkDelete,
	async execute(client, bulkDelete) {
		// const bulkDeleteNumber = bulkDelete.messages.size;

		console.log(JSON.stringify(bulkDelete));
		console.log(JSON.stringify(bulkDelete.messages));

		const fetchedLogs = await bulkDelete.channel.guild.fetchAuditLogs({
			limit: 1,
			type: AuditLogEvent.MessageBulkDelete,
		});

		// Since there's only 1 audit log entry in this collection, grab the first one
		const bulkDeleteLog = fetchedLogs.entries.first();

		// Perform a coherence check to make sure that there's *something*
		if (!bulkDeleteLog) {
			return console.log(
				`Someone bulk deleted ${bulkDeleteNumber} messages in ${bulkDelete.channel.name} but no audit log could be found.`
			);
		}

		// Now grab the user object of the person who did the deletion
		const { executor } = bulkDeleteLog;

		if (executor.id === client.user.id) {
			console.log("saw bulkDelete executed by bot");
			return;
		}

		const modlog = new ModLog({
			type: "Bulk Delete",
			author: executor,
			reason: bulkDeleteLog.reason,
			bulkDeleteNumber,
		});

		modlog.post({
			guild: client.guilds.cache.get(process.env.GUILD_ID),
			client,
		});
	},
};
