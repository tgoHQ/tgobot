const { Events } = require("discord.js");

module.exports = {
	name: Events.MessageCreate,
	execute(client, message) {
		console.log("e");
		if (message.channel.id !== 1073309027649454180) {
			console.log(message.channel.id);
			return;
		}
		message.react("👋");
	},
};
