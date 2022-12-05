//jshint esversion:8
const { Client, Collection, Events, GatewayIntentBits, AuditLogEvent, REST, Routes } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

function create(raw) {
  const modlogChannel = raw.interaction.guild.channels.cache.get(process.env.MODLOG_CHANNEL_ID);

  const embed = new EmbedBuilder()
    .setTitle("Mod Log")
    .setColor("137c5a")
    .addFields(
      {name: "Type", value: raw.type},
      {name: "Target User", value: raw.targetUser},
      {name: "Target Channel", value: raw.targetChannel},
      {name: "Slowmode Amount", value: raw.slowmode},
      {name: "Duration", value: raw.duration},
      {name: "Reason", value: raw.reason}
    );
  modlogChannel.send({ embeds: [embed] });

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
