//jshint esversion:8
const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageDelete,
	execute(message) {
		message.channel.send("saw delete event");
		console.log(`got event!`);
	},
};
