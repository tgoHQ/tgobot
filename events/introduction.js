const { Events } = require("discord.js");

module.exports = {
	name: Events.MessageCreate,
	execute(client, message) {
		console.log("a");
		if (message.channel !== 1073309027649454180) return;
		message.react("👋");
	},
};
