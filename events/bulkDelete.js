//jshint esversion:8
const { Events } = require('discord.js');
const modlog = require("../modules/modlog");


module.exports = {
	name: Events.MessageDelete,
	execute(client, message) {
		message.channel.send("saw bulk delete event");
		message.channel.send(client.user.username);
	},
};
