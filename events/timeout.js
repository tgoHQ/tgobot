const { Events } = require("discord.js");

module.exports = {
	name: Events.GuildMemberUpdate,
	execute(client, guildMemberUpdate) {
		console.log("guild member update event");

		console.log(JSON.stringify(guildMemberUpdate));
		//if user isn't timed out, return
		if (!guildMemberUpdate.communication_disabled_until) {
			return;
		}

		console.log("user is timed out");
	},
};
