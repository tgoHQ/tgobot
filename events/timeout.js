const { Events, userMention } = require("discord.js");
const ModLog = require("../modules/modlog");

module.exports = {
	name: Events.GuildMemberUpdate,
	execute(client, guildMemberUpdate) {
		console.log("guild member update event");

		// if (!guildMemberUpdate.communicationDisabledUntilTimestamp) {
		// 	return;
		// }

		const modlog = new ModLog({
			type: "Mute",
			author: client.user,
			reason: "",
			targetUser: guildMemberUpdate.user,
		});

		// console.log(
		// 	"timestamp",
		// 	guildMemberUpdate.communicationDisabledUntilTimestamp
		// );
		// console.log(
		// 	"difference",
		// 	guildMemberUpdate.communicationDisabledUntilTimestamp - Date.now()
		// );
	},
};
