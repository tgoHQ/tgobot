//jshint esversion:8
const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageDeleteBulk,
	execute(client) {
		client.channels.fetch(1049128945095811143).send("saw bulk delete event");
		console.log(`got event!`);
	},
};
