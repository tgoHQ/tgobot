//jshint esversion:8
const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageDelete,
	execute(client) {
		console.log(`got event!`);
	},
};
