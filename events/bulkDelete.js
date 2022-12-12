//jshint esversion:8
const { Events } = require('discord.js');
const modlog = require("../modules/modlog");
const client = require("../index.js");


module.exports = {
	name: Events.MessageDelete,
	execute(message) {
		message.channel.send("saw bulk delete event");
		console.log(JSON.stringify(client));
	},
};
