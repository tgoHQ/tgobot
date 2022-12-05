//jshint esversion:8
const { Client, Collection, Events, GatewayIntentBits, AuditLogEvent, REST, Routes, inlineCode } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const humanizeDuration = require("humanize-duration");

async function create(raw) { //creates a new log

  //clean up log

  //save log to db
  //then

  //post log to modlog channel
  post(raw, raw.interaction.guild.channels.cache.get(process.env.MODLOG_CHANNEL_ID));

  //dm target user if applicable
  if ("targetUser" in raw) {
    raw.interaction.client.users.send(raw.targetUser, string(raw, true) + "\nFor appeals: https://forms.gle/4jWKXXXjWPhp9GbW6");
  }

  //return string for response
  return string(raw);

}

function string(log, includeReason) { //takes log object and returns string representation. include reason bool
  let string;

  let humanDuration;
  if ("duration" in log) {
    humanDuration = humanizeDuration(log.duration);
  }

  if (log.type === "Warn") {
    string = `<:warn:1049224507598061628> Warned ${log.targetUser}`;
  }
  else if (log.type === "Slowmode") {
    string = `<:slowmode:1049227157156671508> Set slowmode to ${humanizeDuration(log.slowmodeInterval)} in ${log.targetChannel}`;
  }
  else if (log.type === "Bulk Delete") {
    string = `<:delete:1049226132622409749> Bulk deleted ${log.bulkDeleteNumber} messages in ${log.targetChannel}`;
  }
  else if (log.type === "Mute") {
    string = `<:timeout:1049257820882747432> Muted ${log.targetUser} for ${humanDuration}`;
  }
  else if (log.type === "Unmute") {
    string = `<:timeout:1049257820882747432> Unmuted ${log.targetUser}`;
  }
  else if (log.type === "Ban") {
    string = `<:ban:1049256901562609684> Banned ${log.targetUser}`;
  }
  else if (log.type === "Unban") {
    string = `<:ban:1049256901562609684> Unbanned ${log.targetUser}`;
  }

  if (includeReason == true) {
    string += `with reason ${inlineCode(log.reason)}.`;
  }
  else {
    string += '.';
  }

  return string;
}

function post(log, modlogChannel) { //posts a log object to the modlog channel

  const embed = new EmbedBuilder()
    .setTitle("Mod Log")
    .setColor("137c5a")
    .addFields(
      {name: "Author", value: log.author.toString()},
      {name: "Type", value: log.type},
      {name: "Reason", value: log.reason}
    );

  if ('targetUser' in log) embed.addFields({name: "Target User", value: log.targetUser.toString()});
  if ('targetChannel' in log) embed.addFields({name: "Target Channel", value: log.targetChannel.toString()});
  if ('slowmodeInterval' in log) embed.addFields({name: "Slowmode Interval", value: humanizeDuration(log.slowmodeInterval)});
  if ('duration' in log) embed.addFields({name: "Duration", value: humanizeDuration(log.duration)});
  if ('bulkDeleteNumber' in log) embed.addFields({name: "Messages Deleted", value: log.bulkDeleteNumber.toString()});

  modlogChannel.send({ embeds: [embed] });
}

module.exports = {
  create, string
};

// {
//   type: string,
//   author: userObj,
//   reason: string,
//   targetUser: userObj,
//   duration: int(ms),
//   slowmodeInterval: int,
//   targetChannel: channelObj,
//   bulkDeleteNumber: int,
//   interaction: interaction
// };
