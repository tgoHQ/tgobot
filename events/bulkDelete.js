//jshint esversion:8
const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageDeleteBulk,
	execute(message) {
		message.channel.send("saw bulk delete event");
	},
};
