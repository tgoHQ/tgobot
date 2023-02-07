const { Events } = require("discord.js");

module.exports = {
	name: Events.GuildMemberUpdate,
	execute(client, guildMemberUpdate) {
		console.log("guild member update event");

		console.log(
			"timestamp",
			guildMemberUpdate.communicationDisabledUntilTimestamp
		);
		const timeoutEndDate = new Date(
			guildMemberUpdate.communicationDisabledUntilTimestamp
		);
		console.log("end date", timeoutEndDate);
		console.log(
			"difference",
			guildMemberUpdate.communicationDisabledUntilTimestamp - Date.now()
		);
		//if user isn't timed out, return
		// if (!guildMemberUpdate.communication_disabled_until) {
		// 	return;
		// }

		// console.log("user is timed out");
	},
};
