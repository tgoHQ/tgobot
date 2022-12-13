//jshint esversion:8
const { Events } = require('discord.js');
const modlog = require("../modules/modlog");


module.exports = {
	name: Events.MessageDelete,
	execute(client, messages, channel) {
		//pull together all information from audit log

		//call modlog
		const log = {
			type: "Bulk Delete",
			targetChannel: channel,

		}
		modlog.create();

	},
};
