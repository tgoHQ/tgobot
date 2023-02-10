const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
	name: Events.MessageDelete,
	execute(client, message) {
		console.log("message deleted event");

		if (message.guild?.id != process.env.GUILD_ID) {
			console.log("not in guild");
			return;
		}

		console.log(message.content);
	},
};
