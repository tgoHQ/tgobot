// //TODO make this work on older messages

// const { Events, EmbedBuilder } = require("discord.js");

// module.exports = {
// 	name: Events.MessageUpdate,
// 	execute(client, oldMessage, newMessage) {
// 		console.log("message update event");

// 		if (newMessage.guild?.id != process.env.GUILD_ID) {
// 			console.log("message updated from outside main guild");
// 			return;
// 		}

// 		const temporaryLogChannel = newMessage.guild.channels.cache.get(
// 			process.env.TEMPORARY_LOG_CHANNEL_ID
// 		);

// 		const embed = new EmbedBuilder()
// 			.setColor("4a78fc")
// 			.setTitle("Message Edited")
// 			.setURL(newMessage.url)
// 			.setDescription(
// 				`Message edited by ${newMessage.author} in ${newMessage.channel}.`
// 			)
// 			.setFields(
// 				{ name: "Before", value: oldMessage.content },
// 				{ name: "After", value: newMessage.content }
// 			);

// 		temporaryLogChannel.send({ embeds: [embed] });
// 	},
// };
