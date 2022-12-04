//jshint esversion:8
const { Client, Collection, Events, GatewayIntentBits, AuditLogEvent, REST, Routes } = require('discord.js');

function create(event) {
  console.log(JSON.stringify(event));
}

module.exports = {
  create
};

const rawmodlog = {
  author: userObj,
  type: "Mute",
  reason: "you suck",
  targetUser: userObj,
  duration: 3600000,
  slowmode: 20,
  targetChannel: channelObj,
};
