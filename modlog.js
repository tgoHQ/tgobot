//jshint esversion:8
const { Client, Collection, Events, GatewayIntentBits, AuditLogEvent, REST, Routes } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

function create(raw) {
  const modlogChannel = raw.interaction.guild.channels.cache.get(process.env.MODLOG_CHANNEL_ID);

  const embed = new EmbedBuilder()
    .setTitle("Mod Log")
    .setColor("137c5a")
    .addFields(
      {name: "Author", value: raw.author.toString()},
      {name: "Type", value: raw.type},
      {name: "Reason", value: raw.reason}
    );

  if ('targetUser' in raw) embed.addFields({name: "Target User", value: raw.targetUser.toString()});
  if ('targetChannel' in raw) embed.addFields({name: "Target Channel", value: raw.targetChannel.toString()});
  if ('slowmode' in raw) embed.addFields({name: "Slowmode Amount", value: raw.slowmode});
  if ('duration' in raw) embed.addFields({name: "Duration", value: raw.duration});

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
