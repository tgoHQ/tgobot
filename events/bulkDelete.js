//jshint esversion:8
const { Events } = require('discord.js');
const modlog = require("../modules/modlog");


module.exports = {
	name: Events.MessageDeleteBulk,
	execute(client, messages, channel) {
		message.channel.send("saw bulk delete event");
		message.channel.send(client.user.username);

		//pull together all information from audit log

		//call modlog
		const log = {
			type: "Bulk Delete",
			targetChannel: channel,

		}
		modlog.create();

	},
};
