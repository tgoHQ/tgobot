//jshint esversion:8
const { Client, Collection, Events, GatewayIntentBits, AuditLogEvent, REST, Routes } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

function error(interaction, error) {
  interaction.reply(`:octagonal_sign: Error: ${inlineCode(error.message)}`);
}

module.exports = {
  error
};
