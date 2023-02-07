const { Events } = require("discord.js");

module.exports = {
	name: Events.GuildMemberUpdate,
	execute() {
		console.log("yo");
	},
};
