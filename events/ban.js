const { Events, userMention } = require("discord.js");
const ModLog = require("../modules/modlog");

module.exports = {
	name: Events.GuildBanAdd,
	execute(client, { user }) {
		console.log(user);

		const modlog = new ModLog({
			type: "Ban",
			author: client.user,
			reason: "",
			targetUser: user,
		});
	},
};
