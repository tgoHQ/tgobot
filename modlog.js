//jshint esversion:8
const { Client, Collection, Events, GatewayIntentBits, AuditLogEvent, REST, Routes } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const modlogChannel = interaction.guild.channels.cache.get(process.env.MODLOG_CHANNEL_ID);


function create(raw) {

  const embed = new EmbedBuilder()
    .setTitle("Mod Log")
    .setTimestamp()
    .addFields(
      {name: "Type", value: raw.reason},
      {name: "Reason", value: raw.reason}
    )
    ;
  modlogChannel.send({ embeds: [embed] });

  console.log(JSON.stringify(raw));
}

module.exports = {
  create
};

// {
//   type: "Mute",
//   author: userObj,
//   reason: "you suck",
//   targetUser: userObj,
//   duration: 3600000,
//   slowmode: 20,
//   targetChannel: channelObj,
// };
