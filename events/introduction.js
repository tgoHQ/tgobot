const { Events } = require("discord.js");

module.exports = {
	name: Events.MessageCreate,
	execute(client, message) {
		if (message.channel.id != proccess.env.INTRODUCTION_CHANNEL_ID) return;
		message.react("👋");
	},
};
