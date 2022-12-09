//jshint esversion:8
const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildMemberAdd,
	execute(client) {
		console.log(`got event!`);
	},
};
