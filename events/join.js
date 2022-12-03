//jshint esversion:8
const { Events } = require('discord.js');

module.exports = {
	name: Events.guildMemberAdd,
	execute(client) {
		console.log(`got event!`);
	},
};
